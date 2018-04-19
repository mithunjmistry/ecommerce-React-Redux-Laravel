import React from "react";
import {Grid, Col, Row, ListGroup, ListGroupItem} from "react-bootstrap";
import LoadingOrderAnimation from 'react-loading-order-with-animation';

const People = () => (
    <Grid className={"minimum-height about-div"}>
        <Row>
            <h4>People</h4>
            <hr/>
            <Col lg={12} md={12}>
                <LoadingOrderAnimation animation="fade-in"
                                       move="from-top-to-bottom"
                                       distance={30}
                                       speed={1000}
                                       wait={300}>
                    <div>
                        <Row>
                            <Col lg={4} md={4}>
                                <img width={230} height={230} src={"/images/mithun.jpeg"}/>
                                <h4 className={"sixzero-weight"}>Mithun Mistry</h4>
                                <p>MS Computer Science</p>
                                <p>Software Engineer</p>
                                <span>
                                    <a href={"https://www.linkedin.com/in/mithunjmistry/"} target={"_blank"}>
                                        <img src={"/images/linkedin.jpg"}/>
                                    </a>

                                    <a href={"https://github.com/mithunjmistry"} target={"_blank"}>
                                        <img src={"/images/git.png"}/>
                                    </a>

                                    <a href="https://stackoverflow.com/cv/mithunjmistry" target="_blank">
                                        <img src={"/images/stackoverflow.png"} alt="Stack Overflow"/>
                                    </a>
                                </span>
                            </Col>

                            <Col lg={8} md={8}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <p className={"project-contributions"}>Important links - </p>
                                        <ul>
                                        <li>
                                            <a
                                                href={"https://github.com/mithunjmistry"}
                                                target={"_blank"}>
                                                Mithun Mistry's GitHub
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href={"https://www.mithunjmistry.com"}
                                                target={"_blank"}>
                                                Mithun Mistry's Portfolio
                                            </a>
                                        </li>

                                        <li>
                                        <a
                                            href={"https://github.com/mithunjmistry/ecommerce-React-Redux-Laravel"}
                                            target={"_blank"}>
                                            Project GitHub
                                        </a>
                                        </li>
                                        </ul>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <p className={"project-contributions"}>Project contributions - </p>
                                        <ul>
                                            <li>Developed SPA in <strong>React.js</strong> with <strong>Redux</strong> in JavaScript <strong>ES6</strong> and PHP Laravel 5.6.</li>
                                            <li>Integrated third-party libraries like <strong>react-bootstrap</strong>, react-router & <strong>Material-UI</strong> increasing UX by 30%.</li>
                                            <li>Implemented <strong>RESTful APIs</strong> in <strong>PHP Laravel</strong> & <strong>OAuth2</strong> secure authentication using <strong>Laravel Passport</strong>.</li>
                                            <li>Devised relationships and retrieved data from database using <strong>Eloquent ORM.</strong></li>
                                            <li>Configured & used Node.js, <strong>webpack</strong> with <strong>babel</strong> & integrated React with PHP Laravel.</li>
                                            <li>Styled web pages with <strong>SASS</strong> and injected it in JSX with SASS loader using webpack.</li>
                                            <li>Implemented custom Redux middleware using <strong>redux-thunk</strong> and used axios for async data loading.</li>
                                            <li>Integrated & configured domains for <strong>Mailgun API</strong> based email service which improved email sending speed by 20% over SMTP.</li>
                                            <li>Deployed web application on <strong>Google Cloud</strong>, RDBMS on <strong>AWS</strong> and configured domains via <strong>GoDaddy</strong>.</li>
                                            <li>Implemented Server side <strong>LRU cache</strong> using <strong>Redis</strong> on cloud reducing database calls by 60% and reduced server response time from 3 seconds to 1.2 second.</li>
                                            <li>Integrated <strong>Verifalia email validation</strong> API that avoided spam registrations.</li>
                                        </ul>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>

                        <hr/>

                        <Row>
                            <Col lg={4} md={4}>
                                <img width={185} height={185} src={"/images/noavatar.jpg"}/>
                                <h3 className={"sixzero-weight"}>Kuldeep</h3>
                                <p>MS Computer Science</p>
                                <span>
                                    <a href={"https://www.linkedin.com/in/kuldeepsinh-c-470b55151/"} target={"_blank"}>
                                        <img src={"/images/linkedin.jpg"}/>
                                    </a>

                                    <a href={"https://github.com/KuldeepSinh24"} target={"_blank"}>
                                        <img src={"/images/git.png"}/>
                                    </a>
                                </span>
                            </Col>

                            <Col lg={8} md={8}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <p className={"project-contributions"}>Project contributions - </p>
                                        <ul>
                                            <li>Responsible for database schema design using <strong>ER diagram</strong> and normalized database.</li>
                                            <li>Utilize tools such as <strong>Oracle Workbench</strong> for MySQL database management.</li>
                                            <li><strong>ETL</strong> for user, product data using tools like Excel for initial setup of database with information.</li>
                                        </ul>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>
                </LoadingOrderAnimation>
            </Col>
        </Row>
    </Grid>
);

export default People;