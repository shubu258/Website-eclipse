export const BOOK_EMAIL = "shivanshnigam2582@gmail.com";

/** Every "Book a call" button jumps to the booking form, which emails us via /api/book. */
export const BOOK_CALL_HREF = "/#book";

/** Careers enquiries go to the same inbox. */
export const CAREERS_HREF = `mailto:${BOOK_EMAIL}?subject=${encodeURIComponent("Careers")}`;
