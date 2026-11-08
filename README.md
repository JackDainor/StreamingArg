# StreamingArg

Tienda de suscripciones digitales basada en el diseño de StreamingBo. Frontend estático + Vercel Functions + Neon PostgreSQL.

## Incluye
- Tienda responsive y carrito.
- Pedidos guardados en Neon (no dependen de WhatsApp).
- Panel privado `/admin.html`.
- Administración de plataformas, precio base en USDT y visibilidad.
- Tipo de cambio configurable: 1 USDT = X ARS. La tienda muestra ARS automáticamente.
- Gestión de pedidos y estado: pendiente, contactado, pagado o cancelado.
- Registro de ventas/suscripciones por cliente: plataforma, importe cobrado, fecha de inicio y vencimiento.
- Tablas creadas automáticamente al primer acceso a la API.
- `schema.sql` disponible para ejecutar manualmente si se prefiere.

## Plataformas incluidas
Netflix; HBO Max Platino; HBO Max Estándar; Prime Video; Disney+ Estándar; Disney+ Premium; Gemini Pro; Super Grok; DramaBox; Paramount+; Canva; CapCut; Crunchyroll.

Los precios empiezan en **0 USDT** deliberadamente. Cargá los importes correctos desde el panel antes de publicar la tienda; un producto sin precio no se puede comprar.

## Publicar en GitHub y Vercel + Neon

1. Descomprimí el ZIP y subí el contenido a un repositorio nuevo de GitHub.
2. En Vercel elegí **Add New → Project**, importá ese repositorio y desplegá.
3. En el proyecto de Vercel abrí **Storage** o **Integrations** y agregá Neon (Postgres). Si Vercel te ofrece Neon como base de datos recomendada, seleccioná esa opción y vinculá la base.
4. En **Project Settings → Environment Variables**, verificá que exista `DATABASE_URL` (Neon/Vercel suele ofrecerla al vincular la integración). Debe ser la URL de conexión PostgreSQL con SSL.
5. Agregá también:
   - `ADMIN_PASSWORD`: contraseña privada fuerte para entrar al administrador.
   - `SESSION_SECRET`: cadena aleatoria larga y distinta de la contraseña.
6. Guardá las variables y hacé **Redeploy** para que las funciones las reciban.
7. Abrí `https://TU-DOMINIO.vercel.app`. La primera llamada a la API crea las tablas y carga las plataformas iniciales.
8. Entrá a `https://TU-DOMINIO.vercel.app/admin.html`, iniciá sesión y configurá primero el tipo de cambio y los precios en USDT.

## Desarrollo local

Requiere Node.js 20+ y cuenta/base Neon.
```bash
npm install
cp .env.example .env.local
# Editá .env.local con DATABASE_URL, ADMIN_PASSWORD y SESSION_SECRET
npx vercel dev
```

## Seguridad y notas
- Nunca publiques `.env.local` ni credenciales. `.env.example` solo contiene valores de ejemplo.
- Cambiá `ADMIN_PASSWORD` y `SESSION_SECRET` por valores fuertes antes de producción.
- El precio final en ARS se calcula en el servidor al crear el pedido, usando el tipo de cambio configurado en ese momento.
- El pedido queda guardado en Neon y se visualiza en Pedidos del panel. No se envía automáticamente un WhatsApp: desde el administrador podés copiar/usar el teléfono del cliente y contactarlo.
- El tipo de cambio inicial de 1.000 ARS por USDT es un valor de prueba, no una cotización en tiempo real. Ajustalo en Configuración.
