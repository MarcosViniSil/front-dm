import React, { useState } from 'react';
import { Button, message } from 'antd';
// Se quiser um ícone, você precisa instlar e importar do @ant-design/icons
// Mas vamos manter simples aqui
const ShareButton = ({ title, text, url }: { title: string, text: string, url: string }) => {
  const [loading, setLoading] = useState(false);
  const handleShareClick = async () => {
    // 1. Verificar se o navegador/dispositivo atual suporta a API de compartilhamento nativa
    if (!navigator.share) {
      // Fallback: se não suportar (um PC antigo, por exemplo), podemos apenas alertar ou copiar o link
      message.warning('O compartilhamento interativo não é suportado pelo seu navegador atual. Você pode copiar a URL!');
      return;
    }
    try {
      setLoading(true);
      
      // 2. Chamar a API e passar as informações
      await navigator.share({
        title: title || 'Venha ver isso no Amigos da Fauna!',
        text: text || 'Achei esse conteúdo bem interessante!',
        url: url || window.location.href, // Compartilha a URL da página atual se não for passada nenhuma
      });
      
      console.log('Compartilhado com sucesso!');
    } catch (error: any) {
       // Se o usuário clicar em "cancelar" na tela de compartilhamento,
       // o navegador lança um erro "AbortError".
       // Nós podemos ignorá-lo para não mostrar uma mensagem de erro na tela ao usuário atoa.
       if (error.name !== "AbortError") {
         console.error('Falha ao compartilhar', error);
         message.error('Ocorreu um erro ao tentar abrir as opções de compartilhamento.');
       }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button 
      type="primary" 
      onClick={handleShareClick}
      loading={loading}
    >
      Compartilhar Animal
    </Button>
  );
};
export default ShareButton;