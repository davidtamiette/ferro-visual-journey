# EDGE FUNCTIONS REMOVIDAS TEMPORARIAMENTE

Esta pasta anteriormente continha as Edge Functions do Supabase que estavam causando conflitos no deploy do Railway.

As Edge Functions foram movidas para a pasta `_backup/supabase-functions/` e devem ser deployadas diretamente no Supabase usando:

```bash
supabase functions deploy send-contact-email --project-ref oqcicjjjicazrfgdgynl
```

Este arquivo temporário impede o Railway de detectar esta pasta como código executável.
