import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

/*
- navigating의 2가지 방법
1. Link Component를 이용
2. router 라이브러리의 router.push이용 
*/

/*
URL 마스킹하는 법
as 속성을 이용하면 됨!!
ex)
  const onClick = (id, title) => {
    router.push(
      {
        pathname: `/movies/${id}`,
        query: {
          title,
        },
      },
      `/movies/${id}` -> 얘가 as 속성
    );
  };


  <Link
    href={{
      pathname: `/movies/${movie.id}`,
      query: {
        title: movie.original_title,
      },
    }}
    as={`/movies/${movie.id}`}
  >
    <a>{movie.original_title}</a>
  </Link>
*/
export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// SSR은 유저가 접속하기 전에 처리하는 것! -> 탭 제목을 바꾼다거나, API를 받아온다거나 하는 등. 단, 유저에게 보이기까지의 시간이 조금 걸릴 것.
// SSR을 사용하면 loading 화면 없이 서버측에서의 작업이 완료된 후에야 모든 정보가 보여질 것. -> reactJS가 아니고 HTML로서 보여줌 == 자바스크립트를 비활성화하더라도 볼 수 있음. => SEO에서 용이
// 즉, API가 느리다면 유저한테는 아무화면도 안 보일것(Header, Footer, Loader 등 안 보임.) 흰 화면이었다가 모든 처리가 백엔드에서 완료되면 그때 전체가 한번에 뜸.
export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
