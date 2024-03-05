import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// import Searchbar from "@/components/shared/Searchbar";
// import Pagination from "@/components/shared/Pagination";
import CommunityCard from "@/components/cards/CommunityCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";

async function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await fetchCommunities({
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 25,
    });
    console.log('result----!!!')
    console.log(result)
    return (
        <>
        <h1 className='head-text'>Communities</h1>

        {/* <div className='mt-5'>
            <Searchbar routeType='communities' />
        </div> */}

        <section className='mt-9 flex flex-wrap gap-4'>
            {result.communities.length === 0 ? (
            <p className='no-result'>No Result</p>
            ) : (
            <>
            dsfs
                {result.communities.map((community) => (
                    // <h2 className='text-light-1'>{community.id}</h2>
                    <CommunityCard
                        key={`community-${community.id}`}
                        id={community.id}
                        name={community.name}
                        username={community.username}
                        imageUrl={community.image}
                        bio={community.bio}
                        members={community.members}
                    />
                ))}
            </>
            )}
        </section>
{/* 
        <Pagination
            path='communities'
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
        /> */}
        </>
    );
}

export default Page;
