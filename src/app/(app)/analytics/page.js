import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/chart";
import SectionBox from "@/components/layouts/SectionBox";
import { Page } from "@/models/Page";
import { Statistics } from "@/models/Statistics";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { differenceInDays,parseISO,addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default async function AnalyticsPage() {

    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect('/');
    }
    const page = await Page.findOne({ owner: session.user.email });
    const groupedViews = await Statistics.aggregate([
        {
            $match: {
                type: 'view',
                uri: page.uri
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        date: "$createdAt",
                        format: "%Y-%m-%d"
                    },
                },
                count: {
                    "$count": {},
                }
            }
        }
    ], {
        $order:'-_id'
    })

    const clicks = await Statistics.find({
        page: page.uri,
        type: 'click',
      });
   
    /*
        const viewsCount = await Statistics.countDocuments({ type: 'view', uri: page.uri });
        const clicksCount = await Statistics.countDocuments({ type: 'click', uri: page.links.map(l => l.uri) });
    */


    return (
        <div>
            <SectionBox>
                {/* {groupedViews.map(({ _id: date, count }) => (
                    // eslint-disable-next-line react/jsx-key
                    <div>{date}:{count}</div>
                ))} */}
                <h2 className="text-xl mb-6 text-center">Views</h2>
                <Chart data={groupedViews.map(o => ({
                    'date':o._id,
                    'views':o.count,
                }))}/>  

                {/* <h2 className="text-xl mt-8 mb-6 text-center">Clicks</h2>
                {page.links.map(link => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="border-t border-gray-200 py-4">
                        <h3>{link.title || 'no title'}</h3>
                        <p>
                            {link.subtitle || 'no subtitle'}
                        </p>
                    </div>
                ))} */}

            </SectionBox>
            <SectionBox>
        <h2 className="text-xl mb-6 text-center">Clicks</h2>
        {page.links.map(link => (
          <div key={link.title} className="md:flex gap-4 items-center border-t border-gray-200 py-4">
            <div className="text-blue-500 pl-4">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <div className="grow">
              <h3>{link.title || 'no title'}</h3>
              <p className="text-gray-700 text-sm">{link.subtitle || 'no description'}</p>
              <a className="text-xs text-blue-400" target="_blank" href="link.url">{link.uri}</a>
            </div>
            <div className="text-center">
              <div className="border rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl">
                  {
                    clicks
                      .filter(
                        c => c.uri === link.url
                          && isToday(c.createdAt)
                      )
                      .length
                  }
                </div>
                <div className="text-gray-400 text-xs uppercase font-bold">Clicks today</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl">
                  {clicks.filter(c => c.uri === link.url).length}
                </div>
                <div className="text-gray-400 text-xs uppercase font-bold">Clicks total</div>
              </div>
            </div>
          </div>
        ))}
      </SectionBox>
        </div>
    )
}