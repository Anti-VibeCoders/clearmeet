from pydantic_settings import BaseSettings
from typing import List
from pydantic import Field, SecretStr
import secrets

class Settings(BaseSettings):
    # Configuración de seguridad (mejorada)
    SECRET_KEY: SecretStr = Field(  # Usar SecretStr para ocultar en logs
        default=secrets.token_urlsafe(32),  # Genera clave segura por defecto
        min_length=32,
        description="Clave secreta para JWT (oculta en logs)"
    )
    
    # Configuración de base de datos
    DATABASE_URL: str = Field(
        default="sqlite:///./test.db",
        pattern=r"^(sqlite|postgresql|mysql)://.*",  # Validación adicional
        description="URL de conexión a la base de datos (sqlite/postgresql/mysql)"
    )
    
    # Configuración de entorno
    DEBUG: bool = Field(
        default=True,  # Por seguridad, False por defecto
        description="Habilita modo debug (no usar en producción)"
    )
    
    # Seguridad
    ALLOWED_ADMIN_IPS: List[str] = Field(
        default=["127.0.0.1"],  # Solo localhost por defecto
        description="IPs autorizadas para acceso admin"
    )
    
    CORS_ORIGINS: List[str] = Field(
        default=["*"],  # Ajustar en producción
        description="Orígenes permitidos para CORS"
    )
    
    class Config:
        env_file = ".env"  # Ruta relativa más simple
        env_file_encoding = 'utf-8'
        extra = 'ignore'

        env_prefix = "FLOMECO_"  # Todas las vars deben empezar con FLOMECO_
        case_sensitive = True  # Distingue mayúsculas/minúsculas

settings = Settings()
