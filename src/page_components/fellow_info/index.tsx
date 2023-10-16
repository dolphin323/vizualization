import React, { Fragment, memo } from "react";
import styles from "./styles.module.css";
import { BarChart } from "@/components/bar_chart/bar_chart";
import { ImageWithFallback } from "@/components/common/image_with_fallback/image_with_fallback";
import { ACMFellow } from "@/helpers/getAcmFellowData";

type FellowInfoProps = {
  acmFellow: ACMFellow | null;
};

const FellowInfo: React.FC<FellowInfoProps> = ({ acmFellow }) => {
  return (
    <div className={styles.info}>
      {acmFellow ? (
        <Fragment>
          <div className={styles.left_info}>
            <ImageWithFallback
              src={acmFellow.imageLink || ""}
              fallbackImage="/avatar_scholar.png"
              alt="profile image"
              width={200}
              height={200}
            />
            {acmFellow.googleScholarProfile && (
              <a
                href={acmFellow.googleScholarProfile}
                target="_blank"
                rel="noreferrer"
                className={styles.linkToGS}
              >
                google scholar
              </a>
            )}
            {acmFellow.twitterProfile && (
              <a
                href={acmFellow.twitterProfile}
                target="_blank"
                rel="noreferrer"
                className={styles.linkToTwit}
              >
                Twitter
              </a>
            )}
          </div>
          <div className={styles.right_info}>
            <span style={{ fontWeight: 700, marginBottom: "10px" }}>
              {acmFellow?.givenName + " " + acmFellow?.lastName}
              {"\n"}
            </span>
            <div className={styles.right_text_info}>
              <span>
                {" "}
                <span style={{ fontWeight: 600 }}>Location:</span>{" "}
                {acmFellow.location}
              </span>
              <span>
                {" "}
                <span style={{ fontWeight: 600 }}>
                  Year when was a ACM fellow:
                </span>{" "}
                {acmFellow.year}
              </span>
              <span>
                {" "}
                <span style={{ fontWeight: 600 }}>Why a ACM fellow:</span>{" "}
                {acmFellow.citation}
              </span>
              <span>
                <span style={{ fontWeight: 600 }}>Interests:</span>{" "}
                {acmFellow.interests
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("[", "")
                  .replaceAll("]", "")}
              </span>
            </div>
          </div>
          {acmFellow.googleScholarProfile && (
            <div style={{ margin: "0px 20px 20px 20px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>Citations: {acmFellow.citations}</span>
                <span>h-index: {acmFellow.hindex}</span>
                <span>i10-index: {acmFellow.i10index}</span>
              </div>
              <BarChart
                citation_histogram={acmFellow?.citation_histogram}
                //{name: , hindex}
              />
            </div>
          )}
        </Fragment>
      ) : (
        <span>Click on bubble to know more!</span>
      )}
    </div>
  );
};

export default memo(FellowInfo);
