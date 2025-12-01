
const Pagination = ({ page, pages, onChange }) => {
    if (pages <= 1) return null;
    const arr = Array.from({ length: pages }, (_, i) => i + 1);
    return (
        <div style={{ marginTop: 12 }}>
            {arr.map(p => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    style={{
                        marginRight: 6,
                        padding: '6px 10px',
                        borderRadius: 6,
                        background: p === page ? '#111827' : '#e5e7eb',
                        color: p === page ? '#fff' : '#111827',
                        border: 'none'
                    }}
                >
                    {p}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
