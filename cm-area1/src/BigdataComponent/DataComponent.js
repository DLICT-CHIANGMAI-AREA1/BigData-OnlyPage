import { Container } from "react-bootstrap";
import "animate.css";
import { BackDroup } from "./DataBackDroup";
import TrackVisibility from "react-on-screen";
export const DataPage = () => {
    return (
        <section className="banner-data" id="home">
            <TrackVisibility>
                {({ isVisible }) => (
                    <div
                        style={{ textAlign: "center" }}
                        className={isVisible ? "animate__animated animate__fadeInDown" : ""}
                    >
                        <h1 style={{ paddingBottom: "100px", fontSize: "50px" }}>
                            ระบบฐานข้อมูลสารสนเทศเพื่อการบริหารจัดการ (BigData)
                        </h1>
                    </div>
                )}
            </TrackVisibility>

            <Container>
                <BackDroup />
            </Container>
        </section>
    );
};
