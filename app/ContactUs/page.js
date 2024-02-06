import ContactForm from "../../components/ContactForm";

export default function Home() {
  return (
    <div className="p-5 max-w-3xl mx-auto bg-slate-200 mb-5 mt-4">
      <h1 className="p-4 text-3xl font-bold text-center">Contact Us</h1>
      <p className="pl-4 text-center">Please fillout the form below. We will
        get back to you as soon as possible. </p>

      <ContactForm />
    </div>
  );
}