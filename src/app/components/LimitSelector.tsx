'use client';

import { useRouter } from 'next/navigation';

interface LimitSelectorProps {
  limit: number;
  searchQuery?: string;
}

export default function LimitSelector({ limit, searchQuery }: LimitSelectorProps) {
  const router = useRouter();

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = event.target.value;
    const params = new URLSearchParams();
    params.set('limit', newLimit);
    params.set('offset', '0');

    if (searchQuery) {
      params.set('query', searchQuery);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1">
      <label htmlFor="limit" className="text-sm text-gray-400">
        Itens por página:
      </label>
      <select
        id="limit"
        value={limit}
        onChange={handleLimitChange}
        className="bg-gray-700 text-white rounded px-2 py-1"
      >
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}