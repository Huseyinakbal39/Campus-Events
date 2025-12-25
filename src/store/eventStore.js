import { create } from "zustand";

export const useEventStore = create((set, get) => ({
  likedIds: new Set(),
  goingIds: new Set(),

  isLiked: (id) => get().likedIds.has(id),
  isGoing: (id) => get().goingIds.has(id),

  toggleLike: (id) =>
    set((state) => {
      const next = new Set(state.likedIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { likedIds: next };
    }),

  toggleGoing: (id) =>
    set((state) => {
      const next = new Set(state.goingIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { goingIds: next };
    }),

  clearAll: () => set({ likedIds: new Set(), goingIds: new Set() }),
}));
