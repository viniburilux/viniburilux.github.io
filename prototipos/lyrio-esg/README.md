# Lyrio ESG — Protótipo

Protótipo navegável da plataforma Lyrio ESG, publicado dentro do repositório Pages `viniburilux/viniburilux.github.io`.

## Estrutura

- `src/LyrioESGPlatform.jsx`: componente recebido.
- `source/`: entrada do Vite.
- `index.html` e `assets/`: build estático servido pelo GitHub Pages.
- `package.json` e `pnpm-lock.yaml`: dependências e reprodução do build.

## Desenvolvimento local

```bash
pnpm install
./node_modules/.bin/vite build
```

O Vite usa `base: "./"` porque esta página vive em uma subpasta. O diretório `lyrio-build/` é intermediário e não deve ser versionado.

## URL esperada

Depois que o GitHub Pages estiver publicado a partir da branch `main`, a página deverá estar em:

`https://viniburilux.github.io/prototipos/lyrio-esg/`

Este é um protótipo visual com dados demonstrativos; não representa ainda uma integração de dados ESG em produção.
