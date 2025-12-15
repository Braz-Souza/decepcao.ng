import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages = signal<Message[]>([
    {
      id: 1,
      text: 'Olá! Como posso ajudar?',
      sender: 'other',
      timestamp: new Date()
    }
  ]);

  newMessage = signal('');
  private messageIdCounter = 2;

  sendMessage() {
    const messageText = this.newMessage().trim();

    if (messageText) {
      const newMsg: Message = {
        id: this.messageIdCounter++,
        text: messageText,
        sender: 'user',
        timestamp: new Date()
      };

      this.messages.update(msgs => [...msgs, newMsg]);
      this.newMessage.set('');

      // Simular resposta automática
      setTimeout(() => {
        const autoReply: Message = {
          id: this.messageIdCounter++,
          text: 'achou mesmo que ia funcionar? kkkkkkkkkkkk',
          sender: 'other',
          timestamp: new Date()
        };
        this.messages.update(msgs => [...msgs, autoReply]);
      }, 1000);
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
