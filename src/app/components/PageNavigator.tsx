'use client'; // Mark this as a client component

interface PageNavigatorProps {
    page: number;
    totalPeople: number;
    limit: number;
    selectedFilterProperty: string;
    filterInput: string;
    fetchPeople: (a: number, b: string, c: string) => void;
    setPage: (d: number) => void
}

export default function PageNavigator({ page, totalPeople, limit, selectedFilterProperty, filterInput, setPage, fetchPeople }: PageNavigatorProps) {

    const handleNextPage = () => {
        const newPage = page + 1;
        if (totalPeople - newPage * limit > -limit) {
            setPage(newPage);
            fetchPeople(newPage, selectedFilterProperty, filterInput);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            fetchPeople(newPage, selectedFilterProperty, filterInput);
        }
    };

    return (

        <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                &lt;&lt;
            </button>
            <button
                onClick={handleNextPage}
                disabled={page * limit >= totalPeople}
                className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${page * limit >= totalPeople ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                &gt;&gt;
            </button>
        </div>
    );
}
