export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <div className="pagination">
      <button className="btn ghost" disabled={!canPrev} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <span>
        Page {page + 1} of {totalPages}
      </span>
      <button className="btn ghost" disabled={!canNext} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  );
}
