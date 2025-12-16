import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelService } from '../../services/model.service';

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
  private modelService = inject(ModelService);
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

      // Chamar o serviço do modelo
      this.modelService.sendMessage(messageText).subscribe({
        next: (response) => {
          const autoReply: Message = {
            id: this.messageIdCounter++,
            text: response.message || JSON.stringify(response),
            sender: 'other',
            timestamp: new Date()
          };
          this.messages.update(msgs => [...msgs, autoReply]);
        },
        error: (error) => {
          console.error('Erro ao chamar o modelo:', error);
          const errorReply: Message = {
            id: this.messageIdCounter++,
            text: 'Erro ao processar sua mensagem.',
            sender: 'other',
            timestamp: new Date()
          };
          this.messages.update(msgs => [...msgs, errorReply]);
        }
      });
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
