/**
 * Opens every link to another site in a new tab, so a Reader keeps the page
 * they were reading. On the About document, a link that is the whole of a list
 * item — the shape of the links list — is also marked rel="me", so the
 * platforms can confirm the site is the Poet's; a link inside the bio's prose
 * is not.
 * @param {import('satteri').PluginFactoryContext} context
 * @returns {import('satteri').HastPluginDefinition}
 */
export default function externalLinks({ fileURL }) {
  const isAbout = Boolean(fileURL?.pathname.includes('/src/content/about/'));
  return {
    name: 'external-links',
    element: {
      filter: ['a'],
      visit(link, ctx) {
        if (!/^https?:\/\//.test(String(link.properties.href))) return;
        const rel = ['noopener'];
        if (isAbout && isWholeListItem(link, ctx)) rel.unshift('me');
        ctx.setProperty(link, 'target', '_blank');
        ctx.setProperty(link, 'rel', rel);
      },
    },
  };
}

/**
 * @param {import('hast').Element} link
 * @param {import('satteri').HastVisitorContext} ctx
 */
function isWholeListItem(link, ctx) {
  const item = ctx.parent(link);
  return (
    item.type === 'element' &&
    item.tagName === 'li' &&
    ctx.textContent(item).trim() === ctx.textContent(link).trim()
  );
}
