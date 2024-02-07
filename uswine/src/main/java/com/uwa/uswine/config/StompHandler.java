package com.uwa.uswine.config;

import com.uwa.uswine.user.jwt.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.nio.file.AccessDeniedException;


@RequiredArgsConstructor
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class StompHandler implements ChannelInterceptor {
    private final JWTUtil jwtUtil;

    public class InvalidTokenException extends RuntimeException {
        public InvalidTokenException(String message) {
            super(message);
        }
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        System.out.println("message : " + message);
        System.out.println("헤더 : " +  message.getHeaders());
        System.out.println("token : " + accessor.getNativeHeader("Authorization"));
        if (accessor.getCommand() == StompCommand.CONNECT) {
            if (!jwtUtil.validateToken(accessor.getFirstNativeHeader("Authorization"))) {
                throw new InvalidTokenException("Invalid JWT token");
            }
        }
        return message;
    }
}
