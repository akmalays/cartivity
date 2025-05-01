import { Toaster } from 'react-hot-toast';

function GlobalToaster() {
  return (
    <Toaster
      toastOptions={{
        success: {
          iconTheme: {
            primary: "white",
            secondary: "black",
          },
          style: {
            color: "white",
            background: "green",
          },
        },
        error: {
          iconTheme: {
            primary: "white",
            secondary: "black",
          },
          style: {
            color: "white",
            background: "red",
          },
        },
      }}
      position="top-center"
      reverseOrder={false}
    />
  );
}

export default GlobalToaster;
