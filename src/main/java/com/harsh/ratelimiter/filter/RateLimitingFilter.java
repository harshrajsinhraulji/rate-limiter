package com.harsh.ratelimiter.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // Extract API key from request header, This identifies the client making the request
        String apiKey = request.getHeader("X-API-KEY");

        // Check if API key is missing or empty
        // If true, we cannot track or limit this user
        if (apiKey == null || apiKey.isEmpty()) {

            // Set HTTP status to 400 (Bad Request)
            // This tells client that request is invalid
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

            // Write error message in response body
            response.getWriter().write("Missing API Key");

            // VERY IMPORTANT:
            // Stop further execution so request does NOT reach controller
            return;
        }

        // If API key is valid → allow request to proceed
        // This passes request to next filter / controller
        filterChain.doFilter(request, response);
    }


}
