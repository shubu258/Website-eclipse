export const BOOK_EMAIL = "shivanshnigam2582@gmail.com";

/** Every "Book a call" button opens an email to us. */
export const BOOK_CALL_HREF = `mailto:${BOOK_EMAIL}?subject=${encodeURIComponent("Book a call")}`;

/** Careers enquiries go to the same inbox. */
export const CAREERS_HREF = `mailto:${BOOK_EMAIL}?subject=${encodeURIComponent("Careers")}`;
