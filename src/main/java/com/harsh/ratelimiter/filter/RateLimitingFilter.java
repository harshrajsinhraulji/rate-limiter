package com.harsh.ratelimiter.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    // Max requests allowed per window
    private static final int MAX_REQUESTS = 3;

    // Time window (10 seconds)
    private static final long WINDOW_SIZE = 10_000;

    // API key → request timestamps
    private final Map<String, List<Long>> requestStore = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Extract API key from header
        String apiKey = request.getHeader("X-API-KEY");

        // Reject if missing
        if (apiKey == null || apiKey.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Missing API Key");
            return;
        }

        long currentTime = System.currentTimeMillis();

        // Get or create timestamp list (thread-safe)
        List<Long> timestamps = requestStore.computeIfAbsent(
                apiKey,
                k -> Collections.synchronizedList(new ArrayList<>())
        );

        // Remove expired timestamps
        timestamps.removeIf(ts -> (currentTime - ts) > WINDOW_SIZE);

        // Check rate limit
        if (timestamps.size() >= MAX_REQUESTS) {
            response.setStatus(429); // Too Many Requests
            response.getWriter().write("Rate Limit Exceeded");
            return;
        }

        // Record current request
        timestamps.add(currentTime);

        // Continue request
        filterChain.doFilter(request, response);
    }
}