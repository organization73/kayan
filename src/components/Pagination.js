import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

function PrevIcon() {
    return <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />;
}

function NextIcon() {
    return <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />;
}

function PaginationItem({ type, number, content, onClick }) {
    let className = "block size-8 rounded border border-gray-100 text-center leading-8";
    if (type === "current") {
        className = "block size-8 rounded border-black bg-black text-center leading-8 text-white";
    }
    if (type === "prev" || type === "next") {
        className = "inline-flex size-8 items-center justify-center rounded border border-gray-100";
    }
    return (
        <li>
            <button onClick={onClick} className={className}>
                {type === "page" || type === "current" ? number : content}
            </button>
        </li>
    );
}

function Pagination({ currentPage, lastPage, onPageChange }) {
    const pages = [
        { type: "prev", content: <PrevIcon />, disabled: currentPage === 1 },
        ...Array.from({ length: lastPage }, (_, i) => ({
            type: currentPage === i + 1 ? "current" : "page",
            number: i + 1,
        })),
        { type: "next", content: <NextIcon />, disabled: currentPage === lastPage },
    ];

    return (
        <ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
            {pages.map((page, index) => (
                <PaginationItem
                    key={index}
                    type={page.type}
                    number={page.number}
                    content={page.content}
                    onClick={() => onPageChange(page.number)}
                    disabled={page.disabled}
                />
            ))}
        </ol>
    );
}

export default Pagination;
