import { blogPosts } from '@/lib/data';

export default function Blog() {
  return (
    <section className="bg-stone-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">Blog</p>
          <h2 className="text-3xl font-light">Ghiduri și articole utile</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <a key={post.title} href="#" className="bg-white group block" data-aos="fade-up">
              <div className="h-44 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:from-gray-300 group-hover:to-gray-400 transition-colors duration-300" />
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
