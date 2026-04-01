"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { UserGeneralStats, UserProjectHistoryItem, UserTransactionHistoryItem, UserOffer } from "@projectua/project-backend-client";
import { toast } from "sonner";
import { api } from "@/lib/api";

interface DashboardContextValue {
    openEditProfile: () => void;

    stats: UserGeneralStats | null;
    statsLoading: boolean;

    projects: UserProjectHistoryItem[];
    projectsLoading: boolean;

    transactions: UserTransactionHistoryItem[];
    transactionsLoading: boolean;
    hasMoreTransactions: boolean;
    loadMoreTransactions: () => Promise<void>;
    loadingMore: boolean;

    offers: UserOffer[];
    offersLoading: boolean;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

interface DashboardDataProviderProps {
    children: ReactNode;
    openEditProfile: () => void;
}

function toastError(err: unknown, label: string) {
    toast.error(`${label}: ${err instanceof Error ? err.message : "Помилка завантаження"}`);
}

export function DashboardDataProvider({ children, openEditProfile }: DashboardDataProviderProps) {
    const [stats, setStats] = useState<UserGeneralStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);

    const [projects, setProjects] = useState<UserProjectHistoryItem[]>([]);
    const [projectsLoading, setProjectsLoading] = useState(true);

    const [transactions, setTransactions] = useState<UserTransactionHistoryItem[]>([]);
    const [transactionsLoading, setTransactionsLoading] = useState(true);
    const [transactionsPage, setTransactionsPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const [offers, setOffers] = useState<UserOffer[]>([]);
    const [offersLoading, setOffersLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        api.portfolio.getUserGeneralStats()
            .then((data) => { if (!ignore) setStats(data ?? null); })
            .catch((err) => { if (!ignore) toastError(err, "Загальна статистика"); })
            .finally(() => { if (!ignore) setStatsLoading(false); });

        api.portfolio.getUserProjectsHistory()
            .then((data) => { if (!ignore) setProjects(Array.isArray(data) ? data : []); })
            .catch((err) => { if (!ignore) toastError(err, "Історія проєктів"); })
            .finally(() => { if (!ignore) setProjectsLoading(false); });

        api.portfolio.getUserTransactionsHistory(1, 10)
            .then((data) => {
                if (!ignore) {
                    setTransactions(data?.data ?? []);
                    setTotalPages(data?.meta?.totalPages ?? 1);
                }
            })
            .catch((err) => { if (!ignore) toastError(err, "Історія транзакцій"); })
            .finally(() => { if (!ignore) setTransactionsLoading(false); });

        api.portfolio.getUserOffers()
            .then((data) => { if (!ignore) setOffers(Array.isArray(data) ? data : []); })
            .catch((err) => { if (!ignore) toastError(err, "Пропозиції"); })
            .finally(() => { if (!ignore) setOffersLoading(false); });

        return () => { ignore = true; };
    }, []);

    async function loadMoreTransactions() {
        if (transactionsPage >= totalPages) return;
        setLoadingMore(true);
        try {
            const nextPage = transactionsPage + 1;
            const data = await api.portfolio.getUserTransactionsHistory(nextPage, 10);
            setTransactions((prev) => [...prev, ...(data?.data ?? [])]);
            setTransactionsPage(nextPage);
            setTotalPages(data?.meta?.totalPages ?? totalPages);
        } catch (err) {
            toastError(err, "Завантаження транзакцій");
        } finally {
            setLoadingMore(false);
        }
    }

    return (
        <DashboardContext.Provider value={{
            openEditProfile,
            stats, statsLoading,
            projects, projectsLoading,
            transactions, transactionsLoading,
            hasMoreTransactions: transactionsPage < totalPages,
            loadMoreTransactions, loadingMore,
            offers, offersLoading,
        }}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard(): DashboardContextValue {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within DashboardDataProvider");
    }
    return context;
}
