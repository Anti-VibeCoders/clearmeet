import { useState } from "react";

interface ShareOptions {
    title?: string;
    text?: string;
    url?: string;
}

const useShare = () => {
    const [isSharing, setIsSharing] = useState(false)
    const [shareError, setShareError] = useState<string | null>(null)

    const share = async ({ title, text, url }: ShareOptions) => {
        setIsSharing(true);
        setShareError(null);

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title || document.title,
                    text: text ||  '',
                    url: url || window.location.href,
                });
                console.log('Contenido compartido con éxito.');
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('El usuario canceló la acción de de compartir')
                } else {
                    console.error('Error al compartir: ', error);
                    setShareError('No se pudo compartir el contenido.');
                }
            } finally {
                setIsSharing(false);
            } 
        } else {
            console.warn('Web Share API no soportada. Cayendo al portapapeles'); 
            try {
                const shareDate = `${title ? title + ': ' : ''}${text ? text + ' ' : ''}${url || window.location.href}`
                await navigator.clipboard.writeText(shareDate)
                alert('Enlace copiado al portapapeles')
            } catch (copyError) {
                console.error('Error al copiar al portapapeles: ', copyError)
                setShareError('No se pudo copiar al portapapeles')
            } finally {
                setIsSharing(false)
            }
        }
    }

    return { share, isSharing, shareError  }
}

export default useShare