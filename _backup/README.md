# Backup das Edge Functions

Esta pasta contém o backup das Edge Functions do Supabase que foram removidas temporariamente do deploy do Railway.

## Função de Contato por Email

- **Arquivo**: `send-contact-email/index.ts`
- **Propósito**: Enviar emails de contato via Resend API
- **Deploy**: Esta função deve ser deployada diretamente no Supabase, não no Railway

## Como restaurar

Para deployar esta função no Supabase:

```bash
# Mover de volta para supabase/functions
mv _backup/supabase-functions/send-contact-email supabase/functions/

# Deploy no Supabase
supabase functions deploy send-contact-email --project-ref oqcicjjjicazrfgdgynl
```

## Variáveis necessárias no Supabase

- `RESEND_API_KEY`: Chave da API do Resend para envio de emails

---
**Nota**: As Edge Functions foram removidas do repositório principal para evitar conflitos com o Railway, que estava tentando executá-las como aplicação principal.
