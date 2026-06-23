export const handlers = {
  observe(sections: NodeListOf<HTMLElement>) {
    const options = {
      root: undefined,
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    }, options);

    for (const section of sections) {
      observer.observe(section);
    }
  },
};
