package com.supratim.chatapp.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.supratim.chatapp.model.ChatMessage;

@RestController
public class ChatController {

	@MessageMapping("/send-message")
	@SendTo("/topic/public")
	public ChatMessage sendMessage(@RequestBody ChatMessage chatMessage) {
		return chatMessage;
	}

}
