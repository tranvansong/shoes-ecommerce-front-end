import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
function Footer() {
  return (
    <footer className="bg-blue-100 p-6 text-slate-800 text-lg">
      <div className="flex items-center space-x-10">
        <div className="w-1/4">
          <img src="images/logoo.png" className="w-28 h-28 object-cover" />
          <div className="mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
            mollitia quasi molestias!
          </div>
          <ul className="flex items-center justify-start space-x-5">
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                <FacebookIcon style={{ fontSize: "35px" }} />
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                <InstagramIcon style={{ fontSize: "35px" }} />
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                <XIcon style={{ fontSize: "35px" }} />
              </a>
            </li>
          </ul>
        </div>
        <div className="w-1/5">
          <h5 className="uppercase text-xl mb-5 font-bold">Services</h5>
          <ul>
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                Order Sneaker, Shoes
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                Clean Shoes
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                Trade Shoes
              </a>
            </li>
          </ul>
        </div>
        <div className="w-1/5">
          <h5 className="uppercase text-xl mb-5 font-bold">Account</h5>
          <ul>
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                Login
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                My Cart
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="w-1/4">
          <h5 className="uppercase text-xl mb-5 font-bold">Contact</h5>
          <ul>
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                Email: example@example.com
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                Phone: 01234 567890
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="hover:text-slate-950">
                Address: 123 Main St, Anytown, USA
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
