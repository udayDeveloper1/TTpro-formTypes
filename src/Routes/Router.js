import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Form1 from "../pages/Form1";
import Form2 from "../pages/Form2";
import Form1List from "../pages/Form1List";
import PdfReview from "../pages/PdfReview";
import FillForm1 from "../pages/FillForm1";
import Form3List from "../pages/Form3List";
import Form3 from "../pages/Form3";

export const router = createBrowserRouter([
    {
      path: "/",
      Component: Home,
    },
    {
        path: "/form1",
        Component: Form1,
      },
      {
        path: "/form1List",
        Component: Form1List,
      },
      {
        path: "/importPdfForm1",
        Component: FillForm1,
      },
      {
        path: "/form3",
        Component: Form3,
      },
      {
        path: "/list-form-3",
        Component: Form3List,
      },
      {
        path: "/form2",
        Component: Form2,
      },
      {
        path: "/PdfReview",
        Component: PdfReview,
      },
      {
        path: "/*",
        Component: Home,
      },
  ]);