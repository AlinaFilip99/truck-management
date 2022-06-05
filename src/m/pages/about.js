import React, { useState } from "react";
import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import audioFile from "../../assets/Why_do_logistics_companies_need_a_TMS.mp3";
import { InputTextarea } from "primereact/inputtextarea";
import lzwCompress from "lzwcompress";
import { Button } from "primereact/button";
import styled from "styled-components";
import AppLayout from "../base/Layout";

const StyledText = styled.div`
  text-align: left;
`;

const AboutPage = () => {
  const [compressedContent, setCompressedContent] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const images = [
    {
      itemImageSrc:
        "https://i.pcmag.com/imagery/roundups/00Q69x9vA6hjYIQenOKnjGA-1.fit_lim.size_1200x630.v1569492601.jpg",
      alt: "",
    },
    {
      itemImageSrc:
        "https://www.teletracnavman.com/media/19655/23383360-900x482.jpg",
      alt: "",
    },
    {
      itemImageSrc:
        "https://i0.wp.com/geotabafrica.com/wp-content/uploads/2017/01/Why-is-Fleet-Management-Important.jpg?fit=1500%2C974&ssl=1",
      alt: "",
    },
    {
      itemImageSrc:
        "https://d3e3a9wpte0df0.cloudfront.net/wp-content/uploads/2018/02/fleet-management.png",
      alt: "",
    },
    {
      itemImageSrc:
        "https://www.apac-insider.com/wp-content/uploads/2021/06/Tracking.jpg",
      alt: "",
    },
  ];
  //   if (isLogged === "false") {
  //     window.location.hash = "/login";
  //   }

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item) => {
    return (
      <div style={{ height: "380px", width: "100%" }}>
        <img
          src={item.itemImageSrc}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          alt={item.alt}
          style={{
            width: "100%",
            height: "380px",
            objectFit: "cover",
          }}
        />
        {/* <Image
          src={item.itemImageSrc}
          alt={item.alt}
          preview
          style={{ width: "100%" }}
          // imageStyle={{ width: "600px", height: "233px" }}
          imageStyle={{
            width: "100%",
            height: "380px",
            objectFit: "cover",
          }}
        /> */}
      </div>
    );
  };

  const onCompress = () => {
    setIsCompressing(true);
    setTimeout(() => {
      let content = {
        text: `Trucks are a vital resource not only for the businesses that own and use them but also for the economy at large. Trucks are one
        of the most expensive assets a company can own, hence the
        importance of their proper maintenance and management.
        
        <h2>What is Truck Management System (TMS)?</h2>
        <StyledText>
          From the moment a business acquires a truck or a fleet of
          trucks, they discover that the trucks are demanding vehicles.
          <br />
          <br />
          Apart from costing a fortune, running and managing a fleet of
          trucks is difficult and can accumulate unwanted costs. Most
          businesses avoid the hassle of managing fleets by acquiring the
          help of a reliable fleet management company. <br />
          <br />
          Truck fleet managers use a pool of trained logistical experts to
          make the management of fleets a lot easier for companies.
          
          A fleet manager handles several issues that pertain to the daily
          operations of a fleet. A fleet management company is likely to
          perform the following tasks and responsibilities.
          <h4>1. Chooses the Right Trucks</h4>
          All trucks are not created equal, and though they may look
          alike, different businesses require different trucks. The
          purpose of the truck, size, cost, and fuel efficiency are
          various factors that come into play.
          <br />
          <br />A fleet manager evaluates the needs of your business and
          helps you choose the right truck for your business.
          <h4>2. Stores the Data</h4>
          Running a fleet of trucks may need management of piles of
          paperwork. It requires filing, retrieval, and analysis of data.
          These data may range from the date of the last oil change to
          when to renew the insurance. A fleet manager undertakes all the
          data management.
          <h4>3. Human Resource Management</h4>
          Operating a fleet of trucks sometimes means that you have to
          manage an army of employees. As the fleet staff grows,
          management also becomes hectic.
          <br />
          <br />
          Fleet management takes this off your hands as it manages drivers
          and other personnel associated with fleets.`,
        galleryImages: images,
        contentImageSrc:
          "https://media.istockphoto.com/photos/fleet-management-picture-id1342438271?b=1&k=20&m=1342438271&s=170667a&w=0&h=EUShOA7l6o8d-ZxWR9RTuQxWD21I0Bfl3VuoQUaf4GQ=",
        videoSrc: "https://www.youtube.com/embed/332sq-WJIOA",
        audio: audioFile,
        mapSrc:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2842181.1622941094!2d22.777179274963835!3d45.919955492788084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff26958976c3%3A0x84ef4f92a804b194!2zUm9tw6JuaWE!5e0!3m2!1sro!2sro!4v1649239672720!5m2!1sro!2sro",
      };

      let result = lzwCompress.pack(content);

      setCompressedContent(result.toString());
      setIsCompressing(false);
    }, 2000);
  };

  return (
    <AppLayout userId={localStorage.getItem("CurrentUserId")}>
      <div
        className="grid"
        style={{
          margin: "20px 20px 80px 20px",
        }}
      >
        <div className="col-12 lg:col-8 ">
          <Card>
            <div>
              <Galleria
                value={images}
                responsiveOptions={responsiveOptions}
                numVisible={5}
                circular
                autoPlay
                // style={{ maxWidth: "640px" }}
                showItemNavigators
                // changeItemOnIndicatorHover
                // showIndicatorsOnItem
                showThumbnails={false}
                showItemNavigatorsOnHover
                showIndicators
                item={itemTemplate}
              />
            </div>
            <StyledText>
              Trucks are a vital resource not only for the businesses that own
              and use them but also for the economy at large. Trucks are one of
              the most expensive assets a company can own, hence the importance
              of their proper maintenance and management.
            </StyledText>
            <h2>What is Truck Management System (TMS)?</h2>
            <StyledText>
              From the moment a business acquires a truck or a fleet of trucks,
              they discover that the trucks are demanding vehicles.
              <br />
              <br />
              Apart from costing a fortune, running and managing a fleet of
              trucks is difficult and can accumulate unwanted costs. Most
              businesses avoid the hassle of managing fleets by acquiring the
              help of a reliable fleet management company. <br />
              <br />
              Truck fleet managers use a pool of trained logistical experts to
              make the management of fleets a lot easier for companies.
            </StyledText>
            <h3>Primary Responsibilities of a TMS</h3>
            <StyledText>
              <Image
                style={{ float: "left", marginRight: "7px" }}
                src="https://media.istockphoto.com/photos/fleet-management-picture-id1342438271?b=1&k=20&m=1342438271&s=170667a&w=0&h=EUShOA7l6o8d-ZxWR9RTuQxWD21I0Bfl3VuoQUaf4GQ="
                alt="Image"
                width="250"
                preview
                // imageStyle={{ width: "600px", height: "233px" }}
              />
              A fleet manager handles several issues that pertain to the daily
              operations of a fleet. A fleet management company is likely to
              perform the following tasks and responsibilities.
              <h4>1. Chooses the Right Trucks</h4>
              All trucks are not created equal, and though they may look alike,
              different businesses require different trucks. The purpose of the
              truck, size, cost, and fuel efficiency are various factors that
              come into play.
              <br />
              <br />A fleet manager evaluates the needs of your business and
              helps you choose the right truck for your business.
              <h4>2. Stores the Data</h4>
              Running a fleet of trucks may need management of piles of
              paperwork. It requires filing, retrieval, and analysis of data.
              These data may range from the date of the last oil change to when
              to renew the insurance. A fleet manager undertakes all the data
              management.
              <h4>3. Human Resource Management</h4>
              Operating a fleet of trucks sometimes means that you have to
              manage an army of employees. As the fleet staff grows, management
              also becomes hectic.
              <br />
              <br />
              Fleet management takes this off your hands as it manages drivers
              and other personnel associated with fleets.
            </StyledText>
            <StyledText>
              <h5>For more informations please check out this video:</h5>
            </StyledText>
            <div>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/332sq-WJIOA"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Card>
        </div>
        <div className="col-12 lg:col-4">
          <Card style={{ marginBottom: "20px" }}>
            <iframe
              id="vp16d51o"
              title="Video Player"
              width="100%"
              height="243"
              frameBorder="0"
              src="https://s3.amazonaws.com/embed.animoto.com/play.html?w=swf/production/vp1&e=1649434884&f=6d51ogiqQ6igKwAo5RsQUg&d=0&m=p&r=360p+720p&volume=100&start_res=720p&i=m&asset_domain=s3-p.animoto.com&animoto_domain=animoto.com&options=autostart/loop"
              allowFullScreen={true}
            ></iframe>
          </Card>
          <Card>
            <iframe
              title="Google maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2842181.1622941094!2d22.777179274963835!3d45.919955492788084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff26958976c3%3A0x84ef4f92a804b194!2zUm9tw6JuaWE!5e0!3m2!1sro!2sro!4v1649239672720!5m2!1sro!2sro"
              style={{
                border: "none",
                width: "-webkit-fill-available",
                height: "250px",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div style={{ marginTop: "15px" }}>
              <audio controls style={{ width: "100%" }}>
                <source src={audioFile} />
              </audio>
            </div>
            <StyledText>
              <h4>Click here to compress the content of this page:</h4>
            </StyledText>
            <div style={{ float: "right" }}>
              <Button
                label="Compress"
                icon="pi pi-bookmark"
                loading={isCompressing}
                onClick={onCompress}
              />
            </div>
            <div>
              <InputTextarea
                style={{
                  width: "100%",
                  marginTop: "15px",
                  maxHeight: "772px",
                }}
                value={compressedContent}
                onChange={(e) => setCompressedContent(e.target.value)}
                rows={5}
                cols={80}
                autoResize
              />
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AboutPage;
