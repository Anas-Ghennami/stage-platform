const Pagination = ({ count, page, pageSize = 10, onPageChange }) => {
  const totalPages = Math.ceil(count / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-3 mt-6">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}
        className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm disabled:opacity-40 hover:bg-gray-200 transition">
        ← Précédent
      </button>
      <span className="text-sm text-gray-500">Page {page} / {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}
        className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm disabled:opacity-40 hover:bg-gray-200 transition">
        Suivant →
      </button>
    </div>
  );
};

export default Pagination;
