package com.taskflow.taskflowbackend.security;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {

    // SECRET KEY

    private static final String SECRET =
            "taskflowportaljwtsecretkeytaskflowportal";

    private static final Key KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    // GENERATE TOKEN

    public static String generateToken(String email) {

        return Jwts.builder()

                .setSubject(email)

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                + 1000 * 60 * 60 * 10
                        )
                )

                .signWith(KEY, SignatureAlgorithm.HS256)

                .compact();
    }

    // EXTRACT EMAIL

    public static String extractEmail(String token) {

        Claims claims = Jwts.parserBuilder()

                .setSigningKey(KEY)

                .build()

                .parseClaimsJws(token)

                .getBody();

        return claims.getSubject();
    }

    // VALIDATE TOKEN

    public static boolean validateToken(
            String token,
            String email
    ) {

        String extractedEmail =
                extractEmail(token);

        return extractedEmail.equals(email);
    }
}