<script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import io from 'socket.io-client';  
  import DefaultNavbar from "@/examples/Navbars/NavbarDefault.vue";
  import DefaultFooter from "@/examples/Footers/FooterDefault.vue";
  import setNavPills from "@/assets/js/nav-pills.js";
  
  const messages = ref([]);
  const newMessage = ref('');
  
  // Función para inicializar la conexión con el socket
  const initSocket = () => {
    const socket = io('http://127.0.0.1:3000');
    
    socket.on('message', (text) => {
      messages.value.push({ text, fromClient: false });
      scrollChatToBottom();
    });
  
    socket.emit('saludo', 'Hola, soy un cliente de Vue.js');
    
    return socket;
  };
  
  let socket;
  
  onMounted(() => {
    setNavPills();
    socket = initSocket();
    messages.value.push({ text: "¡Bienvenido al Chatbot de Ayuda! ¿En qué puedo ayudarte hoy?", fromClient: false });
  });
  
  const sendMessage = () => {
    if (newMessage.value.trim()) {
      socket.emit('message', newMessage.value);
      messages.value.push({ text: newMessage.value, fromClient: true });
      newMessage.value = '';
      scrollChatToBottom();
    }
  };
  
  const scrollChatToBottom = () => {
    nextTick(() => {
      const chatMessages = document.querySelector('.chat-messages');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  };
</script>

<template>
  <DefaultNavbar transparent />
  <header>
    <div class="page-header min-vh-45"
      :style="{
        backgroundImage: 'url(https://img.freepik.com/vector-gratis/copiar-espacio-fondo-azul-formas-onduladas_23-2148403376.jpg?w=900&t=st=1700034876~exp=1700035476~hmac=57eb2233596cb07c83cd133106094ec04c7871881eec7bc91abb4a50daef2af7)',
      }"
      loading="lazy">
      <span class="mask bg-gradient-dark opacity-5"></span>
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-7 d-flex justify-content-center flex-column">
            <h1 class="text-white mb-4">FQA</h1>
            <p class="text-white opacity-8 lead pe-5 me-5">
              Chatbot de ayuda y soporte al cliente
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- <div class="cartan card-body shadow-xl mx-3 mx-md-4 mt-n6"> -->
  <!-- <div class="card cardn card-body shadow-xl mx-3 mx-md-4 mt-n1"> -->
    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <section class="py-7">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 mx-auto">
            <div class="chatbot-page">
              <div class="chatbot-container">
                <div class="chat-window">
                  <div class="chat-messages" ref="chatMessages">
                    <div v-for="message in messages" :key="message.id" class="message"
                        :class="{ 'client-message': message.fromClient, 'bot-message': !message.fromClient }">
                      {{ message.text }}
                    </div>
                  </div>
                  <div class="chat-input">
                    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Escribe un mensaje aquí..." />
                  </div>
                </div>
                <!-- <div class="chat-image">
                  <img src="@/assets/img/charles.jpg" alt="Imagen al lado del chat">
                </div> -->
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
  <DefaultFooter />
</template>

<style scoped>

.card .cardn {
  /* Resto de propiedades no modificadas */
  
  /* Cambios para superponer la carta sobre el header */
  margin-top: -8rem; /* Ajusta este valor según la altura de tu header y la superposición deseada */
  /* Si tu header tiene una altura diferente, es posible que necesites ajustar este valor */
}

.chatbot-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Cambiado de 'center' a 'flex-start' */
  justify-content: flex-start;
  min-height: 100vh;
  /* background-color: #c2c2c2;  */
}

.chatbot-container {
  /* Ajustes para el contenedor del chat */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #D3D3D3;
  width: 100%; /* Ancho relativo al contenedor de la carta */
  height: auto; /* La altura se basa en el contenido */
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}
  
  .chat-window {
    width: 70%;
    border-right: 2px solid #ccc; /* Separador entre el chat y la imagen */
  }
  
  .chat-messages {
    height: 400px;
    overflow-y: auto;
    padding: 20px;
  }
  
  .message {
    margin-bottom: 16px;
    padding: 10px;
    border-radius: 10px;
    background-color: #f7f7f7;
  }
  
  .client-message {
    background-color: #add8e6;
    text-align: right;
  }
  
  .bot-message {
    background-color: #f2f2f2;
  }
  
  .chat-input {
    padding: 20px;
    background-color: white;
  }
  
  .chat-input input {
    width: calc(100% - 40px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .chat-image {
    width: 30%;
    background: url('tu-imagen-aqui.jpg') no-repeat center center;
    background-size: cover;
  }
  
  </style>
  
  
  