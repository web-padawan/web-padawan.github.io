const regExp = /(\d{4})-(\d{2})/;

function groupByYear(pages) {
  const pagesByYear = new Map();

  for (const page of pages) {
    const year = page.date.getFullYear();
    const sameYearPages = pagesByYear.get(year);

    pagesByYear.set(year, (sameYearPages || []).concat(page));
  }

  const sortedYears = Array.from(pagesByYear.entries()).sort(
    ([yearA], [yearB]) => yearB - yearA,
  );

  sortedYears.forEach(([, pages]) => {
    pages.sort((a, b) => {
      const d1 = new Date(a.date);
      const d2 = new Date(b.date);

      // Two posts with the same date
      if (d1.getTime() === d2.getTime()) {
        // Get post number from URL
        const m1 = a.url.match(regExp)
        const m2 = b.url.match(regExp);

        const n1 = m1 && parseInt(m1[2]);
        const n2 = m2 && parseInt(m2[2]);

        return n2 - n1;
      }

      return b.date - a.date;
    });
  });

  return sortedYears;
}

module.exports = { groupByYear };
