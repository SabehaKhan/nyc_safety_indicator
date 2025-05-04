"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import AxiosInstanceAny from "@/components/AxiosInstanceAny";
import AxiosInstance from "@/components/AxiosInstance";

export default function ReviewList({
  ntaname,
  boroname,
}: {
  ntaname: string;
  boroname: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [sort, setSort] = useState("recent");
  const [reviews, setReviews] = useState<
    { star: number; created_at: string; user: string; review_text: string }[]
  >([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
  const [newReview, setNewReview] = useState({ star: 0, review_text: "" });
  const [token, setToken] = useState<string | null>(null); // Token state

  // Retrieve token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
    setIsLoggedIn(!!storedToken); // Set login state based on token presence
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await AxiosInstanceAny.get("/reviews/");

        // Filter reviews on the frontend
        const filteredReviews = response.data.filter(
            (review: { boroname: string | null; ntaname: string | null }) =>
                (!boroname || review.boroname === boroname) &&
                (!ntaname || review.ntaname === ntaname)
        );

        setReviews(filteredReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [ntaname, boroname]);

  // Handle adding a new review
  const handleAddReview = async () => {
    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const response = await AxiosInstance.post(
        "/reviews/",
        {
          review_text: newReview.review_text,
          star: newReview.star,
          boroname,
          ntaname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from state
                      },
        }
      );

      // Add the new review to the list
      setReviews([response.data, ...reviews]);
      setNewReview({ star: 0, review_text: "" }); // Reset the form
    } catch (error) {
if (error instanceof Error) {
      console.error("Failed to add review:", (error as any)?.response?.data || error.message);
} else {
        console.error("Failed to add review:", error);
      }
    }
  };

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === "recent") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sort === "highest") return b.star - a.star;
    if (sort === "lowest") return a.star - b.star;
    return 0;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-white/80 hover:text-white transition-colors"
        >
          <ChevronDown className={`h-5 w-5 mr-1 transition-transform ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Hide Reviews" : "Show Reviews"}
        </button>

        <select
          className="bg-black/30 text-white rounded px-2 py-1 text-sm border border-white/20"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3">
          {isLoggedIn && (
            <div className="bg-white/5 border border-white/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Add a Review</h3>
              <textarea
                className="w-full bg-black/30 text-white rounded p-2 mb-2"
                placeholder="Write your review..."
                value={newReview.review_text}
                onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
              />
              <div className="flex items-center mb-2">
                <span className="text-white mr-2">Rating:</span>
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    onClick={() => setNewReview({ ...newReview, star: index + 1 })}
                    className={`h-5 w-5 cursor-pointer ${
                      index < newReview.star ? "text-yellow-400" : "text-gray-600/30"
                    } fill-current`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>
              <button
                onClick={handleAddReview}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Submit Review
              </button>
            </div>
          )}

          {/*{sortedReviews.map((review, index) => (*/}
          {/*  <div*/}
          {/*    key={index}*/}
          {/*    className="bg-white/5 border border-white/20 backdrop-blur-sm rounded-lg p-4"*/}
          {/*  >*/}
          {/*    <div className="flex justify-between items-center mb-1">*/}
          {/*      <span className="text-white font-medium">{review.user}</span>*/}
          {/*      <span className="text-sm text-blue-200">{new Date(review.created_at).toLocaleDateString()}</span>*/}
          {/*    </div>*/}
          {/*    <div className="flex mb-2">*/}
          {/*      {Array.from({ length: 5 }).map((_, star) => (*/}
          {/*        <svg*/}
          {/*          key={star}*/}
          {/*          className={`h-5 w-5 ${*/}
          {/*            star < review.star ? "text-yellow-400" : "text-gray-600/30"*/}
          {/*          } fill-current`}*/}
          {/*          viewBox="0 0 20 20"*/}
          {/*        >*/}
          {/*          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />*/}
          {/*        </svg>*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*    <p className="text-blue-100 text-sm">{review.review_text}</p>*/}
          {/*  </div>*/}
          {/*))}*/}
          {sortedReviews.map((review, index) => (
              <div
                  key={index}
                  className="bg-white/5 border border-white/20 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-medium">{review.user}</span>
                  <span className="text-sm text-blue-200">
        {new Date(review.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
                </div>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, star) => (
                      <svg
                          key={star}
                          className={`h-5 w-5 ${
                              star < review.star ? "text-yellow-400" : "text-gray-600/30"
                          } fill-current`}
                          viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                      </svg>
                  ))}
                </div>
                <p className="text-blue-100 text-sm">{review.review_text}</p>
              </div>
          ))}
        </div>
      )}
    </div>
  );
}

