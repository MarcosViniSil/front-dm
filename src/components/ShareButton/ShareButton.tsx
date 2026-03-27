import { useState } from 'react';
import { Button, message } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

const ShareButton = ({ title, text, url }: ShareButtonProps) => {
  const [loading, setLoading] = useState(false);
  
  const handleShareClick = async () => {
    if (!navigator.share) {
      navigator.clipboard.writeText(url || window.location.href);
      message.success('URL copiada para a área de transferência!');
      return;
    }
    
    try {
      setLoading(true);
      
      await navigator.share({
        title: title || 'Venha ver isso no Amigos da Fauna!',
        text: text || 'Achei esse conteúdo bem interessante!',
        url: url || window.location.href,
      });
      
      console.log('Compartilhado com sucesso!');
    } catch (error: any) {
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
      type="default" 
      icon={<ShareAltOutlined />}
      onClick={handleShareClick}
      loading={loading}
      block
      style={{
        height: 44,
        fontWeight: 600,
        fontSize: '1rem',
        marginTop: 12
      }}
    >
      Compartilhar
    </Button>
  );
};

export default ShareButton;