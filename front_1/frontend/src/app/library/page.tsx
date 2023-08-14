'use client';
import { useGetKingdoms } from "@/services/hooks";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    PaginationState,
    SortingState,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Kingdom } from "@/interfaces/kingdom.interface";

const Biblioteca = () => {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'name', desc: false },
    ]);

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    );

    const { data, isLoading, error } = useGetKingdoms({
        pagination: {
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
            orderBy: sorting.length === 1 ? sorting[0].id : undefined,
            orderDirection:
                sorting.length === 1 ? (sorting[0].desc ? 'DESC' : 'ASC') : undefined,
        },
    });

    useEffect(() => {
        console.log({ data })
    }, [data]);

    return (
        <>
            <br />
            <h1 className="text-center">{"[[ BIBLIOTECA ]]"}</h1>
            <div className="flex flex-col flex-nowrap justify-center">
                <hr className="m-auto w-80" />
            </div>
            <Link href="/admin" className="ml-5 text-blue-500">
                {">>"} ADMIN PANEL ◀️
            </Link>
            <hr />

            <p>Probando useSWR con reinos.</p>
            {isLoading && <p>Buscando...</p>}
            {error && <p>Error buscando...</p>}

            {data && data.items && (
                <>
                    {data.items.map((kingdom: Kingdom) => <p key={kingdom.id}>{kingdom.name}</p>)}
                </>
            )}
        </>
    );
};

export default Biblioteca;
