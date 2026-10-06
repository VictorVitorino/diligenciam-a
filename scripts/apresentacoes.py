#!/usr/bin/env python3
"""Gera as apresentações HTML (um arquivo autocontido por documento).

Uso:
  python3 scripts/apresentacoes.py            # gera todas e o índice
  python3 scripts/apresentacoes.py 07 o02     # gera só as fontes cujo nome começa com esses prefixos (sem o índice)
  python3 scripts/apresentacoes.py --checar   # só valida as fontes (metadados e JSON dos gráficos)

Fontes em apresentacoes/src/*.html. Cada fonte começa com um comentário de metadados:

  <!--deck
  {"arquivo": "07-estrategia-2027.html", "titulo": "Estratégia 2027", ...}
  -->

seguido de <section class="slide" ...> e, opcionalmente, <style data-deck> e <script data-deck>.
O motor (apresentacoes/motor/deck.css e deck.js) é embutido em cada saída.
"""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PASTA = RAIZ / "apresentacoes"
SRC = PASTA / "src"
MOTOR = PASTA / "motor"

GRUPOS = [
    ("Comece aqui", "a resposta em uma apresentação"),
    ("Portfólio atual", "o que a DTS vende hoje e como está"),
    ("Mercado e método", "concorrentes, IA e a engenharia da diligência"),
    ("Estratégia 2027", "o que mudar, o que criar e como provar"),
    ("Ofertas", "uma apresentação por oferta do catálogo"),
]
CORES = {"Comece aqui": "#F78C16", "Portfólio atual": "#5E8AB4", "Mercado e método": "#2A9D8F",
         "Estratégia 2027": "#1F3263", "Ofertas": "#7A5BC7"}

RE_META = re.compile(r"<!--deck\s*(\{.*?\})\s*-->", re.S)
RE_STYLE = re.compile(r"<style data-deck>.*?</style>", re.S)
RE_SCRIPT = re.compile(r"<script data-deck>.*?</script>", re.S)
RE_JSON = re.compile(r'<script type="application/json">(.*?)</script>', re.S)
RE_SLIDE = re.compile(r'<section class="slide')

OBRIGATORIOS = ("arquivo", "titulo", "pagina", "descricao", "fonte", "grupo", "ordem", "resumo")


def ler_fonte(caminho: Path) -> tuple[dict, str, list[str]]:
    texto = caminho.read_text(encoding="utf-8")
    erros: list[str] = []
    m = RE_META.search(texto)
    if not m:
        return {}, texto, [f"{caminho.name}: falta o comentário <!--deck {{...}} -->"]
    try:
        meta = json.loads(m.group(1))
    except json.JSONDecodeError as e:
        return {}, texto, [f"{caminho.name}: metadados com JSON inválido ({e})"]
    for k in OBRIGATORIOS:
        if k not in meta:
            erros.append(f"{caminho.name}: metadado obrigatório ausente: {k}")
    if meta.get("grupo") not in dict(GRUPOS):
        erros.append(f"{caminho.name}: grupo '{meta.get('grupo')}' não é um de {[g for g, _ in GRUPOS]}")
    corpo = texto[m.end():]
    for i, bloco in enumerate(RE_JSON.findall(corpo), 1):
        try:
            json.loads(bloco)
        except json.JSONDecodeError as e:
            erros.append(f"{caminho.name}: gráfico nº {i} com JSON inválido ({e})")
    if not RE_SLIDE.search(corpo):
        erros.append(f"{caminho.name}: nenhum <section class=\"slide\">")
    return meta, corpo, erros


def montar(caminho: Path, css: str, js: str, modelo: str) -> tuple[dict, list[str]]:
    meta, corpo, erros = ler_fonte(caminho)
    if erros:
        return meta, erros
    estilos = "\n".join(RE_STYLE.findall(corpo))
    scripts = "\n".join(RE_SCRIPT.findall(corpo))
    slides = RE_SCRIPT.sub("", RE_STYLE.sub("", corpo)).strip()
    meta_js = json.dumps(meta, ensure_ascii=False).replace("</", "<\\/")
    saida = (modelo
             .replace("{{TITULO_PAGINA}}", html.escape(meta["pagina"]))
             .replace("{{DESCRICAO}}", html.escape(meta["descricao"]))
             .replace("{{FONTE_SRC}}", caminho.name)
             .replace("{{ESTILO_DECK}}", estilos)
             .replace("{{SCRIPT_DECK}}", scripts)
             .replace("{{META}}", meta_js)
             .replace("{{CSS}}", css)
             .replace("{{JS}}", js)
             .replace("{{SLIDES}}", slides))
    (PASTA / meta["arquivo"]).write_text(saida, encoding="utf-8")
    meta["_slides"] = len(RE_SLIDE.findall(slides))
    return meta, []


def gerar_indice(metas: list[dict]) -> None:
    modelo = (MOTOR / "indice.html").read_text(encoding="utf-8")
    blocos = []
    for grupo, sub in GRUPOS:
        itens = sorted((m for m in metas if m.get("grupo") == grupo), key=lambda m: m["ordem"])
        if not itens:
            continue
        cards = []
        for m in itens:
            cards.append(
                f'<a class="card" href="{html.escape(m["arquivo"])}" style="--c:{CORES[grupo]}">'
                f'<span class="n">{html.escape(str(m.get("rotulo", m["ordem"])))}</span>'
                f'<h3>{html.escape(m["titulo"])}</h3><p>{html.escape(m["resumo"])}</p>'
                f'<div class="ft"><span>{m["_slides"]} slides</span><span>Abrir ➜</span></div></a>')
        blocos.append(f'<section class="grp"><h2>{html.escape(grupo)} <small>{html.escape(sub)}</small></h2>'
                      f'<div class="cards">{"".join(cards)}</div></section>')
    primeiro = next((m["arquivo"] for m in sorted(metas, key=lambda m: (m.get("grupo") != "Comece aqui", m["ordem"]))), "#")
    saida = (modelo.replace("{{GRUPOS}}", "\n".join(blocos))
             .replace("{{N_DECKS}}", str(len(metas)))
             .replace("{{N_SLIDES}}", str(sum(m["_slides"] for m in metas)))
             .replace("{{N_GRUPOS}}", str(len({m["grupo"] for m in metas})))
             .replace("{{PRIMEIRO}}", html.escape(primeiro)))
    (PASTA / "index.html").write_text(saida, encoding="utf-8")


def main(args: list[str]) -> int:
    so_checar = "--checar" in args
    prefixos = [a for a in args if not a.startswith("--")]
    fontes = sorted(SRC.glob("*.html"))
    if not fontes:
        print("Nenhuma fonte em apresentacoes/src/.")
        return 1
    css = (MOTOR / "deck.css").read_text(encoding="utf-8")
    js = (MOTOR / "deck.js").read_text(encoding="utf-8")
    modelo = (MOTOR / "template.html").read_text(encoding="utf-8")
    metas, falhas = [], []
    for f in fontes:
        alvo = not prefixos or any(f.name.startswith(p) for p in prefixos)
        if not alvo:
            continue
        if so_checar:
            meta, corpo, erros = ler_fonte(f)
            meta["_slides"] = len(RE_SLIDE.findall(corpo))
        else:
            meta, erros = montar(f, css, js, modelo)
            if not erros:
                print(f"ok  {f.name} → apresentacoes/{meta['arquivo']} ({meta['_slides']} slides)")
        falhas += erros
        if not erros:
            metas.append(meta)
    arquivos = [m["arquivo"] for m in metas]
    if len(arquivos) != len(set(arquivos)):
        falhas.append("Dois decks com o mesmo 'arquivo' de saída.")
    for e in falhas:
        print("ERRO", e)
    if not so_checar and not falhas and not prefixos:
        gerar_indice(metas)
        print(f"ok  índice → apresentacoes/index.html ({len(metas)} apresentações)")
    return 1 if falhas else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
