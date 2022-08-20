import { useRouter } from "next/router";
import Seo from "../../components/Seo";

export default function Detail({ params }) {
  const router = useRouter(); // router.query.id
  const [title, id] = params || []; // url을 바로 치고 들어갈 시 서버에는 router.query.params가 아직 존재하지 않아 배열이 아님. 그래서 [] 처리를 해준 것.
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}
// => SSR에서 처리를 해주므로 h4 태그 및 영화 title이 html로서 반환됨. => SEO 최적화
export function getServerSideProps({ params: { params } }) {
  return {
    props: { params },
  };
}
