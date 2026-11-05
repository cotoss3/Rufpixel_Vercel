<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Sitemap XML — RufPixel Panamá</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            background: #f8fafc;
            margin: 0;
            padding: 30px;
          }
          #header {
            background: #0d0d0d;
            color: #fff;
            padding: 24px 30px;
            border-radius: 16px;
            margin-bottom: 24px;
            border-bottom: 3px solid #ff5e14;
          }
          h1 {
            margin: 0 0 8px 0;
            font-size: 26px;
            color: #ffffff;
          }
          p {
            margin: 0;
            font-size: 13px;
            color: #94a3b8;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          }
          th {
            background: #f1f5f9;
            color: #475569;
            text-align: left;
            padding: 12px 16px;
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 700;
            border-bottom: 1px solid #e2e8f0;
          }
          td {
            padding: 12px 16px;
            border-bottom: 1px solid #f1f5f9;
            font-size: 13px;
            color: #1e293b;
          }
          tr:hover td {
            background: #fff7ed;
          }
          a {
            color: #ff5e14;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div id="header">
          <h1>Mapa del Sitio XML (Yoast SEO Style)</h1>
          <p>Generado para rastreo e indexación automática en Google Search Console — RufPixel</p>
        </div>
        <div id="content">
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
            <table>
              <tr>
                <th>Sitemap</th>
                <th>Última Modificación</th>
              </tr>
              <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </table>
          </xsl:if>
          <xsl:if test="count(sitemap:urlset/sitemap:url) &gt; 0">
            <table>
              <tr>
                <th>URL</th>
                <th>Prioridad</th>
                <th>Frecuencia</th>
                <th>Última Modificación</th>
              </tr>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td><xsl:value-of select="sitemap:priority"/></td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </table>
          </xsl:if>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
