import EntertainmentNews from "@/components/shared/home/entertainment-news";
import SportNews from "@/components/shared/home/sports-news";
import TopNews from "@/components/shared/home/top-news";
import TrendingNews from "@/components/shared/home/trending-news";

export default function Home() {
    return (
        <div className='flex flex-col space-y-2'>
            <TopNews />
            <hr />
            <TrendingNews />
            <hr />
            <EntertainmentNews />
            <hr />
            <SportNews />
            <hr />
        </div>
    );
}
