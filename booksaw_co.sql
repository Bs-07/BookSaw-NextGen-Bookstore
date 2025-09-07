-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 04, 2025 at 12:39 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booksaw_co`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_log`
--

DROP TABLE IF EXISTS `admin_log`;
CREATE TABLE IF NOT EXISTS `admin_log` (
  `name` varchar(40) NOT NULL,
  `email` varchar(60) NOT NULL,
  `pwd` varchar(15) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_log`
--

INSERT INTO `admin_log` (`name`, `email`, `pwd`) VALUES
('Bruce Wayne', 'admin@gmail.com', 'admin@123');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `cate` varchar(30) NOT NULL,
  `book_name` varchar(80) NOT NULL,
  `price` decimal(50,2) DEFAULT NULL,
  `author` varchar(60) NOT NULL,
  `descp` varchar(5000) NOT NULL,
  `file_name` varchar(800) NOT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `book_name` (`book_name`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `cate`, `book_name`, `price`, `author`, `descp`, `file_name`) VALUES
(1, 'Autography', 'Wings of Fire', '999.00', 'Arun Tiwari', 'Wings of Fire, is the autobiography of the Missile Man of India and the former President of India, Dr. A. P. J. Abdul Kalam. It was written by him and Arun Tiwari. ', 'apj.jpg'),
(2, 'Spirituality', 'Autobiography of a Yogi', '1999.00', 'Paramahansa Yogananda', 'Autobiography of a Yogi recounts his life and his encounters with spiritual figures of the Eastern and the Western world. The book begins with his childhood and family life, then finding his guru, becoming a monk and establishing his teachings of Kriya Yoga meditation. The book continues in 1920 when Yogananda accepted an invitation to speak at a religious congress in Boston, Massachusetts, USA. He then travelled across the USA lecturing and establishing his teachings in Los Angeles, California.', 'autobiography_yogi_book.jpg'),
(3, 'SciFi', 'The Martian', '1299.00', 'Andy Weir', 'The Martian is a 2011 science fiction debut novel written by Andy Weir. The book was originally self-published on Weirs blog, in a serialized format. In 2014, the book was re-released after Crown Publishing Group purchased the exclusive publishing rights.', 'The Martian (Weir novel).jpg'),
(4, 'Geopolitics', 'Why Bharat Matters', '526.00', 'Subrahmanyam Jaishankar', 'This is not just a tough world but also a turbulent and unpredictable one. It is marked by the impact of Covid, conflicts in Ukraine and West Asia, climate events, radicalization and terrorism. There is complex geopolitics at work, such as the rise of China, the changed posture of the United States, the strategy of Russia, the impact of globalization and the power of new technologies.', 'why_bharat_matter.jpg'),
(5, 'Business & Economics', 'Atomic Habits', '599.00', 'James Clear', 'A supremely practical and useful book. James Clear distils the most fundamental information about habit formation, so you can accomplish more by focusing on less.', 'atomic_habits.jpeg'),
(6, 'History', 'Sapiens: A Brief History of Humankind ', '735.00', 'Yuval Noah Harari', 'Sapiens: A Brief History of Humankind is a book by Yuval Noah Harari, first published in Hebrew in Israel in 2011 based on a series of lectures Harari taught at The Hebrew University of Jerusalem, and in English in 2014.', 'Sapiens.jpg'),
(7, 'Fantasy novel', 'Harry Potter and the Sorcerers Stone', '1599.00', 'J. K. Rowling', 'The book was first published in the United Kingdom on 26 June 1997 by Bloomsbury. It was published in the United States the following year by Scholastic Corporation under the title Harry Potter and the Sorcerer Stone. It won most of the British book awards that were judged by children and other awards in the US.', 'Harry Potter_1.jpg'),
(8, 'Novel', 'The Alchemist ', '2199.00', 'Paulo Coelho', 'A shepherd boy embarks on a journey to find the treasure of his dreams… With over 1,150,000 five-star Goodreads ratings, this modern classic is “a wise and inspiring fable about the pilgrimage that life should be” (New York Times bestselling author M. Scott Peck).', 'The Alchemist.jpg'),
(9, 'Biography', 'Into the Wild', '699.00', 'Jon Krakauer', 'Into the Wild Cap is a 1996 non-fiction book written by Jon Krakauer. It is an expansion of a 9,000-word article by Krakauer on Chris McCandless titled \"Death of an Innocent\", which appeared in the January 1993 issue of Outside.', 'Into the Wild.jpg'),
(10, 'Philosophy', 'Ikigai', '354.00', 'Francesc Miralles and Hector Garcia', 'According to the Japanese, everyone has an ikigai—a reason for living. And according to the residents of the Japanese village with the world’s longest-living people, finding it is the key to a happier and longer life.', 'Ikigai.jpg'),
(11, 'Philosophy', 'Relativity', '169.00', ' Albert Einstein ', 'Along with quantum mechanics in the 1920s, Einstein’s Special Theory of Relativity (1905) and General Theory of Relativity (1916) stand as the supreme achievements of twentieth-century physics.In simplest terms, the theory of Relativity is an approach to the measurement and study of space and time. The theory assumes that findings are based upon the relation of the frame of reference to the objects measured. ', 'Relativity.jpg'),
(12, 'Personal Development', 'THE POWER OF YOUR SUBCONSCIOUS MIND', '165.00', 'Joseph Murphy', 'As a man thinketh in his subconscious mind, so is he. Have you wondered why someone is joyous while another is miserable; why someone is fearful and anxious and another is exuding confidence; why so many good and kind people suffer the tortures of life? Dr Joseph Murphy answers these questions in his bestselling self-help book The Power of Your Subconscious Mind. ', 'THE POWER OF YOUR SUBCONSCIOUS MIND.jpg'),
(13, 'Personal Development', 'The Psychology of Money', '409.00', 'Morgan Housel', ' In the psychology of money, the author shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life?s most important matters.', 'The Psychology of Money.jpg'),
(14, 'Personal Development', 'Rich Dad Poor Dad', '1837.00', 'Robert T. Kiyosaki ', 'Robert Kiyosaki shares the story of his two dad: his real father, whom he calls his poor dad, \' and the father of his best friend, the man who became his mentor and his rich dad.\'One man was well educated and an employee all his life, the other\'s education was street smarts over traditional classroom education and he took the path of entrepreneurship a road that led him to become one of the wealthiest men in Hawaii. ', 'Rich Dad Poor Dad.jpg'),
(15, 'Philosophy', 'The Urgency of Change', '439.00', 'J KRISHNAMURTI', 'A  new edition of a fifty-year-old classic by J. Krishnamurti. The topics in this book range from conditioning and awareness, fear and God, to morality and art, suffering and seeking. The dialogues here sparkle with a crispness and clarity that would be the delight of any reader who seeks to deepen his understanding of Krishnamurti\'s teachings; and the art of inquiry through the medium of dialogue finds its finest expression in many passages.', 'The Urgency of Change.jpg'),
(16, 'Fantasy novel', 'THE GOLDFINCH', '1608.00', 'Donna Tartt', 'The novel is a coming-of-age tale told in the first person. The protagonist, 13-year-old Theodore Decker, survives a terrorist bombing at an art museum where his mother is killed. While staggering through the debris, he takes with him a small Dutch Golden Age painting called Het Puttertje (Dutch for The Goldfinch).', 'THE GOLDFINCH.jpg'),
(17, 'Fantasy novel', 'Fantastic Beasts and Where to Find Them', '568.90', 'J.K. Rowling ', 'Fantastic Beasts and Where to Find Them is an indispensable introduction to the magical beasts of the Wizarding World. in this comprehensively updated edition, eagle-eyed readers will spot a number of new beasts and an intriguing new author’s note. Scamander’s years of travel and research have created a tome of unparalleled importance.', 'Fantastic Beasts and Where to Find Them.jpg'),
(18, 'Action and Adventure', 'The Hobbit: Or There and Back Again', '1371.00', 'J.R.R. Tolkien', 'The journey through Middle-earth begins here with J.R.R. Tolkien\'s classic prelude to his Lord of the Rings trilogy.“\"A glorious account of a magnificent adventure, filled with suspense and seasoned with a quiet humor that is irresistible... All those, young or old, who love a fine adventurous tale, beautifully told, will take The Hobbit to their hearts.\"”', 'The Hobbit.jpg'),
(19, 'Action and Adventure', 'Dune', '973.00', 'Frank Herbert', 'Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “\"spice”\" melange, a drug capable of extending life and enhancing consciousness.', 'Dune.jpeg'),
(20, 'Action and Adventure', 'Jurassic Park', '1669.99', 'Michael Crichton', 'Jurassic Park is a 1990 science fiction novel written by Michael Crichton. A cautionary tale about genetic engineering, it presents the collapse of a zoological park showcasing genetically recreated dinosaurs to illustrate the mathematical concept of chaos theory and its real-world implications.', 'Jurassic Park.jpg'),
(21, 'Action and Adventure', 'The Hunger Games: Volume 1', '1623.00', 'Suzanne Collins', 'The Hunger Games is a 2008 dystopian young adult novel by the American writer Suzanne Collins. It is written in the perspective of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America. The Capitol, a highly advanced metropolis, exercises political control over the rest of the nation.', 'The Hunger Games_Volume 1.jpg'),
(22, 'Action and Adventure', 'Lost Horizon', '249.00', 'James Hilton', 'Lost Horizon is a 1933 novel by English writer James Hilton. The book was turned into a film, also called Lost Horizon, in 1937 by director Frank Capra and a lavish musical remake in 1973 by producer Ross Hunter with music by Burt Bacharach. It is best remembered as the origin of Shangri-La, a fictional utopian lamasery located high in the mountains of Tibet.', 'Lost Horizon.jpg'),
(23, 'Action and Adventure', 'Harry Potter and the Cursed Child', '2590.40', 'J. K. Rowling', 'It was always difficult being Harry Potter and it isn’t much easier now that he is an overworked employee of the Ministry of Magic, a husband, and father of three school-age children.While Harry grapples with a past that refuses to stay where it belongs, his youngest son, Albus, must struggle with the weight of a family legacy he never wanted.', 'Harry Potter and the Cursed Child.jpg'),
(24, 'Detective and Mystery', 'Murder on the Orient Express: A Hercule Poirot Mystery', '1197.41', 'Agatha Christie', 'Just after midnight, the famous Orient Express is stopped in its tracks by a snowdrift. By morning, the millionaire Samuel Edward Ratchett lies dead in his compartment, stabbed a dozen times, his door locked from the inside. Without a shred of doubt, one of his fellow passengers is the murderer.', 'Murder on the Orient Express.jpg'),
(25, 'Detective and Mystery', 'GONE GIRL', '783.00', 'Gillian Flynn', 'Gone Girl is a novel written by author Gillian Flynn. It is written as a contemporary thriller novel and is first published in June 2012. The novel\'s core mystery stems from an uncertainty about the protagonist, Dunne. Whether killed his wife, Dunne, is the suspense the novel is built up on.', 'GONE GIRL.jpg'),
(26, 'Detective and Mystery', 'The Honjin Murders: 28', '999.00', 'Seishi Yokomizo', 'In the winter of 1937, the village of Okamura is abuzz with excitement over the forthcoming wedding of a son of the grand Ichiyanagi family. But amid the gossip over the approaching festivities, there is also a worrying rumour - it seems a sinister masked man has been asking questions about the Ichiyanagis around the village.', 'The Honjin Murders 28.jpg'),
(27, 'Fantasy novel', 'The Idiot', '571.00', 'Fyodor Dostoevsky', 'Taken to be an idiot, the naïve Prince Myshkin visits his distant relative General Yepanchin and hopes to charm him, his wife and his three daughters, but his life changes drastically after he stumbles upon a photograph of Nastasya Filippovna.', 'The Idiot.jpg'),
(28, 'Fantasy novel', 'Bell the Bell Jar', '293.00', 'Sylvia Plath', 'In the hauntingly beautiful pages of The Bell Jar, Sylvia Plath takes us on a gripping journey into the fragile psyche of Esther Greenwood. Set against the backdrop of 1950s America, this semiautobiographical novel explores the stifling expectations placed upon women and the suffocating grasp of societal norms.', 'Bell the Bell Jar.jpg'),
(29, 'Philosophy', 'Tao Te Ching', '857.00', 'Laozi', 'Laozi was an ancient Chinese philosopher and writer. He is known as the reputed author of the Tao Te Ching and the founder of philosophical Taoism, and as a deity in religious Taoism and traditional Chinese religions. Although a legendary figure, he is usually dated to around the 6th century BC and reckoned a contemporary of Confucius, but some historians contend that he actually lived during the Warring States period of the 5th or 4th century BC.', 'Tao Te Ching.jpg'),
(30, 'Novel', 'Beloved', '701.00', 'Toni Morrison', 'Sethe, its protagonist, was born a slave and escaped to Ohio, but eighteen years later she is still not free. She has too many memories of Sweet Home, the beautiful farm where so many hideous things happened. And Sethe’s new home is haunted by the ghost of her baby, who died nameless and whose tombstone is engraved with a single word- Beloved.', 'Beloved.jpg'),
(31, 'Novel', 'One Hundred Years of Solitude', '898.69', 'Marquez Gabriel Garcia', 'The novel One Hundred Years of Solitude is an absolute master piece. It manages to capture the various phases and glories of the human history. The book has had a major impact on young minds that have taken up literature as a subject. The book is engaging and intense that reminiscenses of how history repeats itself with the collapse and creation of a new Macondo within a span of a century.', 'One Hundred Years of Solitude.jpeg'),
(32, 'Spirituality', 'KARMA: A YOGIS GUIDE', '1757.00', 'Sadhguru', 'Sadhguru explains what Karma is and how we can use its concepts to enhance our lives, he also tells us about the Sutras, a step-by-step self-help & self-improvement guide to navigating our way in this challenging world. In the process, we get a deeper, richer understanding of life and the power to craft our destinies.', 'KARMA.jpg'),
(33, 'Novel', 'The Da Vinci Code', '254.00', 'BROWN DAN', 'The record-breaking bestsellerA man is murdered in the world\'s most famous museum. Around his body is a ring of codes, drawn in blood. He died to protect a secret which Robert Langdon must uncover. It will be a race against time to decipher this final message. Can he get there before the killers do?', 'The Da Vinci Code.jpg'),
(34, 'Philosophy', 'Life of Pi', '1130.87', 'Yann Martel', 'After the tragic sinking of a cargo ship, a solitary lifeboat remains bobbing on the wild, blue Pacific. The only survivors from the wreck are a sixteen-year-old boy named Pi, a hyena, a zebra (with a broken leg), a female orang-utan - and a 450-pound Royal Bengal tiger. The scene is set for one of the most extraordinary and best-loved works of fiction in recent years', 'Life Of Pi.jpg'),
(35, 'Science', 'Cosmos', '4000.24', 'Carl Sagan', '* Spacecraft missions to nearby planets* The Library of ancient Alexandria* The human brain* Egyptian hieroglyphics* The origin of life* The death of the sun* The evolution of galaxies* The origins of matter, suns and worldsThe story of fifteen billion years of cosmic evolution transforming matter and life into consciousness, of how science and civilisation grew up together, and of the forces and individuals who helped shape modern science. A story told with Carl Sagan\'s remarkable ability to make scientific ideas both comprehensible and exciting.', 'Cosmos.jpg'),
(36, 'Science', 'Black Holes (L) : The Reith', '569.75', 'Stephen Hawking', 'In 2016 Professor Stephen Hawking delivered the BBC Reith Lectures on a subject that has fascinated him for decades - black holes. In these flagship lectures the legendary physicist argues that if we could only understand black holes and how they challenge the very nature of space and time, we could unlock the secrets of the universe.', 'Black Holes  The Reith.jpg'),
(37, 'Science', 'The Theory Of Everything', '3498.00', 'Stephen Hawking', 'Seven lectures by the brilliant theoretical physicist have been compiled into this book to try to explain to the common man, the complex problems of mathematics and the question that has been gripped everyone all for centuries, the theory of existence. Undeniably intelligent, witty and childlike in his explanations, the narrator describes every detail about the beginning of the universe. He describes what a theory that can state the initiation of everything would encompass.', 'The Theory Of Everything.jpg'),
(38, 'Science', 'The Origin of Species', '332.00', 'Charles Darwin', 'Explore the groundbreaking scientific work of Charles Darwin in this edition of The Origin of Species. This book revolutionized our understanding of the natural world and remains a seminal work in the history of science. With a new introduction and commentary, this edition is perfect for anyone interested in the history of evolutionary theory.', 'The Origin of Species.jpg'),
(39, 'Science', 'The God Equation: The Quest for a Theory', '1477.00', 'Michio Kaku', 'This is the story of a quest: to find a Theory of Everything. Einstein dedicated his life to seeking this elusive Holy Grail, a single, revolutionary \'god equation\' which would tie all the forces in the universe together, yet never found it. Some of the greatest minds in physics took up the search, from Stephen Hawking to Brian Greene. None have yet succeeded.', 'The God Equation The Quest for a Theory.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(11) DEFAULT NULL,
  `u_name` varchar(30) NOT NULL,
  `u_email` varchar(60) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  UNIQUE KEY `cart_id` (`cart_id`),
  KEY `fk_cart_book` (`book_id`)
) ENGINE=MyISAM AUTO_INCREMENT=480 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `book_id`, `u_name`, `u_email`, `quantity`) VALUES
(476, 8, 'Amelia Rodriguez', 'amelia.rodriguez@example.com', 1),
(466, 6, 'John Snow', 'stayking@gmail.com', 1),
(474, 6, 'Amelia Rodriguez', 'amelia.rodriguez@example.com', 1),
(475, 7, 'Amelia Rodriguez', 'amelia.rodriguez@example.com', 1),
(465, 4, 'John Snow', 'stayking@gmail.com', 1),
(454, 7, 'Michael Thompson', 'michael.thompson@example.com', 1),
(455, 14, 'Michael Thompson', 'michael.thompson@example.com', 1),
(456, 19, 'Michael Thompson', 'michael.thompson@example.com', 1),
(473, 25, 'Olivia Martinez', 'olivia.martinez@example.com', 1),
(472, 20, 'Olivia Martinez', 'olivia.martinez@example.com', 1),
(477, 9, 'Amelia Rodriguez', 'amelia.rodriguez@example.com', 1),
(478, 10, 'Amelia Rodriguez', 'amelia.rodriguez@example.com', 1),
(479, 15, 'Ava Davis', 'ava.davis@example.com', 4);

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
CREATE TABLE IF NOT EXISTS `coupons` (
  `coupon_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `discount_type` enum('percentage','fixed') NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `first_time_only` tinyint(1) DEFAULT '0',
  `expiry_date` date NOT NULL,
  `usage_limit` int(11) DEFAULT '1',
  `used_count` int(11) DEFAULT '0',
  `status` enum('active','expired','disabled') DEFAULT 'active',
  PRIMARY KEY (`coupon_id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`coupon_id`, `code`, `discount_type`, `discount_value`, `first_time_only`, `expiry_date`, `usage_limit`, `used_count`, `status`) VALUES
(1, 'WELCOME25', 'percentage', '25.00', 1, '2027-09-01', 1, 0, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_detail`
--

DROP TABLE IF EXISTS `delivery_detail`;
CREATE TABLE IF NOT EXISTS `delivery_detail` (
  `delivery_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(50) NOT NULL,
  `u_email` varchar(100) NOT NULL,
  `u_mobileNo` bigint(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(50) NOT NULL,
  `pin` int(10) NOT NULL,
  `state` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  PRIMARY KEY (`delivery_id`),
  KEY `fk_dd_user` (`u_email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `delivery_detail`
--

INSERT INTO `delivery_detail` (`delivery_id`, `u_name`, `u_email`, `u_mobileNo`, `address`, `city`, `pin`, `state`, `country`) VALUES
(3, 'Charlotte Anderson', 'charlotte.anderson@example.com', 8912346849, '426, red road, Sarojini Nagar', 'New Delhi', 110001, 'Delhi', 'Bharat'),
(4, 'James Wilson', 'james.wilson@example.com', 7812564869, '02, Bagh road, near IIT Kanpur', 'Kanpur', 260011, 'Uttar Pradesh', 'Bharat'),
(6, 'Amelia Taylor', 'amelia.taylor@example.com', 6312468968, '02, Bagh road, near IIT Kanpur', 'Kanpur', 281001, 'Uttar Pradesh', 'Bharat'),
(7, 'Daniel Thomas', 'daniel.thomas@example.com', 8976561249, '263, Church street, new market', 'Bengaluru', 560012, 'Karnataka', 'Bharat'),
(8, 'Logan Harris', 'logan.harris@example.com', 8967564513, '263, Church street, new market', 'Bengaluru', 560012, 'Karnataka', 'Bharat'),
(9, 'John Snow', 'stayking@gmail.com', 7, '263, Church street, new market', 'Kanpur', 11001, 'Delhi', 'Bharat'),
(10, 'Michael Thompson', 'michael.thompson@example.com', 6321568934, 'A204, Church Street, near cricket stadium', 'Bengaluru', 301004, 'Karnataka', 'Bharat'),
(13, 'Olivia Martinez', 'olivia.martinez@example.com', 6234169859, 'Flat No. 2025, Tower-G, 7th Avenue, Gaur city-1 ', 'Greater Noida', 231009, 'Uttar Pradesh', 'Bharat'),
(14, 'Ava Davis', 'ava.davis@example.com', 9712345687, '6A, Ganesh Dham, Brijeshwari Annexe', 'Indore', 452016, 'Madhya Pradesh', 'Bharat');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_timing`
--

DROP TABLE IF EXISTS `delivery_timing`;
CREATE TABLE IF NOT EXISTS `delivery_timing` (
  `u_email` varchar(100) NOT NULL,
  `delivery_date` date DEFAULT NULL,
  `delivery_note` text NOT NULL,
  `delivery_id` int(11) DEFAULT NULL,
  KEY `delivery_id` (`delivery_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE IF NOT EXISTS `feedbacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emotion` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `msg` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `user_name`, `user_email`, `emotion`, `msg`, `created_at`) VALUES
(3, 'Michael Thompson', 'michael.thompson@example.com', '😎', 'The site feels hella smooth, no lag at all.  UI is clean af, everything just clicks. Lowkey loving the vibes, keep it up.', '2025-09-01 11:29:56'),
(4, 'Ava Davis', 'ava.davis@example.com', '😍', 'Love the clean UI ✨ so modern and easy to use!', '2025-09-01 11:30:34'),
(5, 'Emily Brown', 'emily.brown@example.com', '?', 'The book collection is really good, I would love to see more mystery novels.', '2025-09-01 12:50:42'),
(6, 'Michael Clark', 'michael.clark@example.com', '?', 'Great interface, easy to find the books I need.', '2025-09-01 12:50:42'),
(7, 'Emma Davis', 'emma.davis@example.com', '?', 'Absolutely love this library system! Very smooth experience.', '2025-09-01 12:50:42'),
(8, 'James Wilson', 'james.wilson@example.com', '?', 'Good service, but please add more science fiction titles.', '2025-09-01 12:50:42'),
(9, 'Olivia Martinez', 'olivia.martinez@example.com', '?', 'I appreciate how fast the search works, keep it up!', '2025-09-01 12:50:42'),
(10, 'William Taylor', 'william.taylor@example.com', '?', 'Overall very nice, maybe add an option for personalized recommendations.', '2025-09-01 12:50:42'),
(11, 'Sophia Anderson', 'sophia.anderson@example.com', '?', 'Such a lovely experience, I enjoy browsing the categories.', '2025-09-01 12:50:42'),
(12, 'Daniel Thomas', 'daniel.thomas@example.com', '?', 'Good job! Adding more history-related books would be great.', '2025-09-01 12:50:42'),
(13, 'Mia White', 'mia.white@example.com', '?', 'Smooth and easy, maybe improve the mobile layout a bit.', '2025-09-01 12:50:42'),
(14, 'David Harris', 'david.harris@example.com', '?', 'I like the request-a-book feature, very helpful.', '2025-09-01 12:50:42'),
(15, 'Isabella Lee', 'isabella.lee@example.com', '?', 'This is amazing! I can finally track my reading list easily.', '2025-09-01 12:50:42'),
(16, 'Alexander Martin', 'alexander.martin@example.com', '?', 'Very nice design, could use a dark mode option.', '2025-09-01 12:50:42'),
(17, 'Emma Jackson', 'emma.jackson@example.com', '?', 'Love how simple it is to borrow books.', '2025-09-01 12:50:42'),
(18, 'Michael Thompson', 'michael.thompson@example.com', '?', 'Good job overall, notifications for due dates would be helpful.', '2025-09-01 12:50:42'),
(19, 'Sophia Garcia', 'sophia.garcia@example.com', '?', 'Really enjoy the variety of authors available.', '2025-09-01 12:50:42'),
(20, 'Ethan Martinez', 'ethan.martinez@example.com', '?', 'Nice app! Suggestion: add book reviews from users.', '2025-09-01 12:50:42'),
(21, 'Ava Hernandez', 'ava.hernandez@example.com', '?', 'I like the clean design, keep it minimal.', '2025-09-01 12:50:42'),
(22, 'Matthew Robinson', 'matthew.robinson@example.com', '?', 'Happy with the service, maybe improve the search filters.', '2025-09-01 12:50:42'),
(23, 'Amelia Rodriguez', 'amelia.rodriguez@example.com', '?', 'This makes reading so much easier, absolutely love it!', '2025-09-01 12:50:42'),
(24, 'William Wood', 'william.wood@example.com', '?', 'Everything works well, suggestion: add audio books.', '2025-09-01 12:50:42'),
(25, 'Olivia Thomas', 'olivia.thomas@example.com', '?', 'Good overall, the request system is very useful.', '2025-09-01 12:50:42'),
(26, 'Alexander Rodriguez', 'alexander.rodriguez@example.com', '?', 'I appreciate the modern design, keep updating the library.', '2025-09-01 12:50:42'),
(27, 'Mia Thompson', 'mia.thompson@example.com', '?', 'Super user-friendly, I really enjoy using this.', '2025-09-01 12:50:42'),
(28, 'Elijah Jackson', 'elijah.jackson@example.com', '?', 'Smooth experience, maybe add book ratings.', '2025-09-01 12:50:42'),
(29, 'Charlotte Wilson', 'charlotte.wilson@example.com', '?', 'Love the idea, keep adding more trending books.', '2025-09-01 12:50:42'),
(30, 'James Davis', 'james.davis@example.com', '?', 'Great service! Suggestion: add a wishlist feature.', '2025-09-01 12:50:42');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
CREATE TABLE IF NOT EXISTS `members` (
  `name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pwd` varchar(15) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`name`, `email`, `pwd`) VALUES
('Alexander Martin', 'alexander.martin@example.com', 'password15'),
('Alexander Rodriguez', 'alexander.rodriguez@example.com', 'password25'),
('Amelia Rodriguez', 'amelia.rodriguez@example.com', 'password22'),
('Amelia Taylor', 'amelia.taylor@example.com', 'password35'),
('Ava Davis', 'ava.davis@example.com', 'password41'),
('Ava Hernandez', 'ava.hernandez@example.com', 'password20'),
('Ava Smith', 'ava.smith@example.com', 'password31'),
('Bob Johnson', 'bob.johnson@example.com', 'password3'),
('Charlotte Anderson', 'charlotte.anderson@example.com', 'password44'),
('Charlotte White', 'charlotte.white@example.com', 'password33'),
('Charlotte Wilson', 'charlotte.wilson@example.com', 'password28'),
('Daniel Thomas', 'daniel.thomas@example.com', 'password11'),
('David Harris', 'david.harris@example.com', 'password13'),
('doms', 'dom299.kd@gmail.com', 'dom!123'),
('Elijah Harris', 'elijah.harris@example.com', 'password40'),
('Elijah Jackson', 'elijah.jackson@example.com', 'password27'),
('Emily Brown', 'emily.brown@example.com', 'password4'),
('Emily Wilson', 'emily.wilson@example.com', 'password30'),
('Emma Davis', 'emma.davis@example.com', 'password6'),
('Emma Jackson', 'emma.jackson@example.com', 'password16'),
('Ethan Brown', 'ethan.brown@example.com', 'password32'),
('Ethan Martinez', 'ethan.martinez@example.com', 'password19'),
('Isabella Lee', 'isabella.lee@example.com', 'password14'),
('James Davis', 'james.davis@example.com', 'password29'),
('James Wilson', 'james.wilson@example.com', 'password7'),
('John Doe', 'johndoe@example.com', 'password1'),
('Liam Martin', 'liam.martin@example.com', 'password38'),
('Logan Harris', 'logan.harris@example.com', 'password42'),
('Mason Johnson', 'mason.johnson@example.com', 'password36'),
('Matthew Robinson', 'matthew.robinson@example.com', 'password21'),
('Mia Thompson', 'mia.thompson@example.com', 'password26'),
('Mia White', 'mia.white@example.com', 'password12'),
('Michael Clark', 'michael.clark@example.com', 'password5'),
('Michael Thompson', 'michael.thompson@example.com', 'password17'),
('mike', 'mike_cop@gmail.com', 'mike123'),
('Nelson Marduk', 'nelson@gmail.com', 'nm@123'),
('Oliver Wilson', 'oliver.wilson@example.com', 'password43'),
('Olivia Martinez', 'olivia.martinez@example.com', 'password8'),
('Olivia Robinson', 'olivia.robinson@example.com', 'password39'),
('Olivia Thomas', 'olivia.thomas@example.com', 'password24'),
('Siyaram', 'shonw@gmail.com', 'shnow123'),
('Sophia Anderson', 'sophia.anderson@example.com', 'password10'),
('Sophia Garcia', 'sophia.garcia@example.com', 'password18'),
('Sophia White', 'sophia.white@example.com', 'password37'),
('John Snow', 'stayking@gmail.com', 'john@789'),
('William Jackson', 'william.jackson@example.com', 'password45'),
('William Martinez', 'william.martinez@example.com', 'password34'),
('William Taylor', 'william.taylor@example.com', 'password9'),
('William Wood', 'william.wood@example.com', 'password23');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `coupon_code` varchar(50) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `delivery_id` int(11) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `delivery_note` text NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_user` (`user_email`),
  KEY `fk_orders_delivery` (`delivery_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_email`, `order_date`, `total_amount`, `coupon_code`, `discount`, `payment_method`, `delivery_id`, `delivery_date`, `delivery_note`) VALUES
(1, 'amelia.taylor@example.com', '2024-04-30 13:47:35', '4778.99', NULL, NULL, 'Cash on Delivery', 6, '2024-05-04', 'You can give it to security guard'),
(2, 'amelia.taylor@example.com', '2024-07-03 11:17:42', '3708.99', NULL, NULL, 'Cash on Delivery', 6, '2024-07-07', 'come after 13:00 pm'),
(3, 'stayking@gmail.com', '2025-03-05 08:26:03', '4953.99', NULL, NULL, 'Cash on Delivery', 9, '2025-03-10', 'come for delivery after 6 PM'),
(4, 'stayking@gmail.com', '2025-03-12 04:50:31', '1981.99', NULL, NULL, NULL, 9, '2025-03-16', ''),
(32, 'olivia.martinez@example.com', '2025-08-28 05:13:29', '14615.00', NULL, NULL, 'Online Payment', 13, '2025-09-01', 'Leave at door and don\'t ring the well'),
(33, 'olivia.martinez@example.com', '2025-08-28 05:21:25', '11511.96', NULL, NULL, 'Cash on Delivery', 13, '2025-09-03', 'Give to tower security guard'),
(34, 'olivia.martinez@example.com', '2025-08-29 12:00:19', '1309.00', NULL, NULL, 'Cash on Delivery', 13, '2025-09-02', 'Come after 7pm'),
(35, 'olivia.martinez@example.com', '2025-08-29 12:05:31', '1309.00', NULL, NULL, 'Cash on Delivery', 13, '2025-09-02', 'Come after 7pm'),
(36, 'michael.thompson@example.com', '2025-08-31 06:05:54', '4761.07', NULL, NULL, 'Online Payment', 10, '2025-09-04', 'No'),
(37, 'michael.thompson@example.com', '2025-08-31 06:09:23', '3031.90', NULL, NULL, 'Online Payment', 10, '2025-09-04', 'come after 13:00 pm'),
(38, 'ava.davis@example.com', '2025-09-01 18:40:47', '4639.81', 'WELCOME25', '1546.60', 'Online Payment', 14, '2025-09-05', 'Slide dwon through main gate'),
(39, 'ava.davis@example.com', '2025-09-02 04:34:08', '9313.00', NULL, '0.00', 'UPI', 14, '2025-09-06', 'Slide dwon through main gate'),
(40, 'olivia.martinez@example.com', '2025-09-02 04:47:44', '2953.41', NULL, '0.00', 'UPI', 13, '2025-09-06', 'You can give it to security guard');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `u_email` varchar(100) NOT NULL,
  `book_name` varchar(100) DEFAULT NULL,
  `author` varchar(60) DEFAULT NULL,
  `file_name` varchar(800) DEFAULT NULL,
  `price` decimal(50,2) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `cate` varchar(30) NOT NULL,
  `status` varchar(20) DEFAULT 'Pending',
  PRIMARY KEY (`id`),
  KEY `fk_items_order` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `u_email`, `book_name`, `author`, `file_name`, `price`, `quantity`, `cate`, `status`) VALUES
(33, 32, 'olivia.martinez@example.com', 'Ikigai', 'Francesc Miralles and Hector Garcia', 'Ikigai.jpg', '354.00', 1, 'Philosophy', 'delivered'),
(34, 32, 'olivia.martinez@example.com', 'The Alchemist ', 'Paulo Coelho', 'The Alchemist.jpg', '2199.00', 2, 'Novel', 'delivered'),
(35, 32, 'olivia.martinez@example.com', 'Into the Wild', 'Jon Krakauer', 'Into the Wild.jpg', '699.00', 3, 'Biography', 'delivered'),
(36, 32, 'olivia.martinez@example.com', 'Harry Potter and the Sorcerers Stone', 'J. K. Rowling', 'Harry Potter_1.jpg', '1599.00', 1, 'Fantasy novel', 'delivered'),
(37, 32, 'olivia.martinez@example.com', 'Sapiens: A Brief History of Humankind ', 'Yuval Noah Harari', 'Sapiens.jpg', '735.00', 6, 'History', 'delivered'),
(38, 32, 'olivia.martinez@example.com', 'KARMA: A YOGIS GUIDE', 'Sadhguru', 'KARMA.jpg', '1757.00', 1, 'Spirituality', 'delivered'),
(39, 33, 'olivia.martinez@example.com', 'Life of Pi', 'Yann Martel', 'Life Of Pi.jpg', '1130.87', 8, 'Philosophy', 'delivered'),
(40, 33, 'olivia.martinez@example.com', 'Relativity', ' Albert Einstein ', 'Relativity.jpg', '169.00', 1, 'Philosophy', 'delivered'),
(41, 33, 'olivia.martinez@example.com', 'THE POWER OF YOUR SUBCONSCIOUS MIND', 'Joseph Murphy', 'THE POWER OF YOUR SUBCONSCIOUS MIND.jpg', '165.00', 4, 'Personal Development', 'delivered'),
(42, 33, 'olivia.martinez@example.com', 'The Psychology of Money', 'Morgan Housel', 'The Psychology of Money.jpg', '409.00', 4, 'Personal Development', 'delivered'),
(43, 35, 'olivia.martinez@example.com', 'The Psychology of Money', 'Morgan Housel', 'The Psychology of Money.jpg', '409.00', 1, 'Personal Development', 'delivered'),
(44, 35, 'olivia.martinez@example.com', 'Sapiens: A Brief History of Humankind ', 'Yuval Noah Harari', 'Sapiens.jpg', '735.00', 1, 'History', 'delivered'),
(45, 35, 'olivia.martinez@example.com', 'THE POWER OF YOUR SUBCONSCIOUS MIND', 'Joseph Murphy', 'THE POWER OF YOUR SUBCONSCIOUS MIND.jpg', '165.00', 1, 'Personal Development', 'delivered'),
(46, 36, 'michael.thompson@example.com', 'One Hundred Years of Solitude', 'Marquez Gabriel Garcia', 'One Hundred Years of Solitude.jpeg', '898.69', 3, 'Novel', 'delivered'),
(47, 36, 'michael.thompson@example.com', 'Beloved', 'Toni Morrison', 'Beloved.jpg', '701.00', 1, 'Novel', 'delivered'),
(48, 36, 'michael.thompson@example.com', 'Tao Te Ching', 'Laozi', 'Tao Te Ching.jpg', '857.00', 1, 'Philosophy', 'delivered'),
(49, 36, 'michael.thompson@example.com', 'Relativity', ' Albert Einstein ', 'Relativity.jpg', '169.00', 3, 'Philosophy', 'delivered'),
(50, 37, 'michael.thompson@example.com', 'Fantastic Beasts and Where to Find Them', 'J.K. Rowling ', 'Fantastic Beasts and Where to Find Them.jpg', '568.90', 1, 'Fantasy novel', 'delivered'),
(51, 37, 'michael.thompson@example.com', 'Harry Potter and the Sorcerers Stone', 'J. K. Rowling', 'Harry Potter_1.jpg', '1599.00', 1, 'Fantasy novel', 'delivered'),
(52, 37, 'michael.thompson@example.com', 'Bell the Bell Jar', 'Sylvia Plath', 'Bell the Bell Jar.jpg', '293.00', 1, 'Fantasy novel', 'delivered'),
(53, 37, 'michael.thompson@example.com', 'The Idiot', 'Fyodor Dostoevsky', 'The Idiot.jpg', '571.00', 1, 'Fantasy novel', 'delivered'),
(54, 38, 'ava.davis@example.com', 'Harry Potter and the Sorcerers Stone', 'J. K. Rowling', 'Harry Potter_1.jpg', '1599.00', 1, 'Fantasy novel', 'shipped'),
(55, 38, 'ava.davis@example.com', 'The Honjin Murders: 28', 'Seishi Yokomizo', 'The Honjin Murders 28.jpg', '999.00', 1, 'Detective and Mystery', 'shipped'),
(56, 38, 'ava.davis@example.com', 'GONE GIRL', 'Gillian Flynn', 'GONE GIRL.jpg', '783.00', 1, 'Detective and Mystery', 'shipped'),
(57, 38, 'ava.davis@example.com', 'Murder on the Orient Express: A Hercule Poirot Mystery', 'Agatha Christie', 'Murder on the Orient Express.jpg', '1197.41', 1, 'Detective and Mystery', 'shipped'),
(58, 38, 'ava.davis@example.com', 'THE GOLDFINCH', 'Donna Tartt', 'THE GOLDFINCH.jpg', '1608.00', 1, 'Fantasy novel', 'shipped'),
(59, 39, 'ava.davis@example.com', 'The Da Vinci Code', 'BROWN DAN', 'The Da Vinci Code.jpg', '254.00', 2, 'Novel', 'pending'),
(60, 39, 'ava.davis@example.com', 'The God Equation: The Quest for a Theory', 'Michio Kaku', 'The God Equation The Quest for a Theory.jpg', '1477.00', 1, 'Science', 'pending'),
(61, 39, 'ava.davis@example.com', 'The Origin of Species', 'Charles Darwin', 'The Origin of Species.jpg', '332.00', 1, 'Science', 'pending'),
(62, 39, 'ava.davis@example.com', 'The Theory Of Everything', 'Stephen Hawking', 'The Theory Of Everything.jpg', '3498.00', 2, 'Science', 'pending'),
(63, 40, 'olivia.martinez@example.com', 'GONE GIRL', 'Gillian Flynn', 'GONE GIRL.jpg', '783.00', 1, 'Detective and Mystery', 'pending'),
(64, 40, 'olivia.martinez@example.com', 'Murder on the Orient Express: A Hercule Poirot Mystery', 'Agatha Christie', 'Murder on the Orient Express.jpg', '1197.41', 1, 'Detective and Mystery', 'pending'),
(65, 40, 'olivia.martinez@example.com', 'Dune', 'Frank Herbert', 'Dune.jpeg', '973.00', 1, 'Action and Adventure', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `popular_books`
--

DROP TABLE IF EXISTS `popular_books`;
CREATE TABLE IF NOT EXISTS `popular_books` (
  `cate` varchar(30) NOT NULL,
  `book_name` varchar(80) NOT NULL,
  `price` decimal(50,2) DEFAULT NULL,
  `author` varchar(60) NOT NULL,
  `descp` varchar(5000) NOT NULL,
  `file_name` varchar(800) NOT NULL,
  PRIMARY KEY (`book_name`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `popular_books`
--

INSERT INTO `popular_books` (`cate`, `book_name`, `price`, `author`, `descp`, `file_name`) VALUES
('Personal Development', 'The Psychology of Money', '409.00', ' Morgan Housel', 'In the psychology of money, the author shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life?s most important matters.', 'The Psychology of Money.jpg'),
('Philosophy', 'Relativity', '169.00', 'Albert Einstein', 'Along with quantum mechanics in the 1920s, Einstein?s Special Theory of Relativity (1905) and General Theory of Relativity (1916) stand as the supreme achievements of twentieth-century physics.In simplest terms, the theory of Relativity is an approach to the measurement and study of space and time. The theory assumes that findings are based upon the relation of the frame of reference to the objects measured.', 'Relativity.jpg'),
('Philosophy', 'Ikigai', '354.00', 'Francesc Miralles and Hector Garcia', 'According to the Japanese, everyone has an ikigai?a reason for living. And according to the residents of the Japanese village with the world?s longest-living people, finding it is the key to a happier and longer life.', 'Ikigai.jpg'),
('Novel', 'The Alchemist', '2199.00', 'Paulo Coelho', 'A shepherd boy embarks on a journey to find the treasure of his dreams? With over 1,150,000 five-star Goodreads ratings, this modern classic is ?a wise and inspiring fable about the pilgrimage that life should be? (New York Times bestselling author M. Scott Peck).', 'The Alchemist.jpg'),
('Biography', 'Into the Wild', '699.00', 'Jon Krakauer', 'Into the Wild Cap is a 1996 non-fiction book written by Jon Krakauer. It is an expansion of a 9,000-word article by Krakauer on Chris McCandless titled \"Death of an Innocent\", which appeared in the January 1993 issue of Outside.', 'Into the Wild.jpg'),
('Detective and Mystery', 'Murder on the Orient Express: A Hercule Poirot Mystery', '1197.41', 'Agatha Christie', 'Just after midnight, the famous Orient Express is stopped in its tracks by a snowdrift. By morning, the millionaire Samuel Edward Ratchett lies dead in his compartment, stabbed a dozen times, his door locked from the inside. Without a shred of doubt, one of his fellow passengers is the murderer.', 'Murder on the Orient Express.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `requested_books`
--

DROP TABLE IF EXISTS `requested_books`;
CREATE TABLE IF NOT EXISTS `requested_books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `book_name` varchar(200) NOT NULL,
  `author` varchar(150) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `requested_books`
--

INSERT INTO `requested_books` (`id`, `user_name`, `user_email`, `book_name`, `author`, `created_at`) VALUES
(1, 'Emily Brown', 'emily.brown@example.com', 'The Silent Patient', 'Alex Michaelides', '2025-09-01 12:52:15'),
(2, 'Michael Clark', 'michael.clark@example.com', 'Educated', 'Tara Westover', '2025-09-01 12:52:15'),
(3, 'Emma Davis', 'emma.davis@example.com', 'The Midnight Library', 'Matt Haig', '2025-09-01 12:52:15'),
(4, 'James Wilson', 'james.wilson@example.com', 'Dune', 'Frank Herbert', '2025-09-01 12:52:15'),
(5, 'Olivia Martinez', 'olivia.martinez@example.com', 'Where the Crawdads Sing', 'Delia Owens', '2025-09-01 12:52:15'),
(6, 'William Taylor', 'william.taylor@example.com', 'Atomic Habits', 'James Clear', '2025-09-01 12:52:15'),
(7, 'Sophia Anderson', 'sophia.anderson@example.com', 'It Ends With Us', 'Colleen Hoover', '2025-09-01 12:52:15'),
(8, 'Daniel Thomas', 'daniel.thomas@example.com', 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', '2025-09-01 12:52:15'),
(9, 'Mia White', 'mia.white@example.com', 'Pride and Prejudice', 'Jane Austen', '2025-09-01 12:52:15'),
(10, 'David Harris', 'david.harris@example.com', 'The Alchemist', 'Paulo Coelho', '2025-09-01 12:52:15'),
(11, 'Isabella Lee', 'isabella.lee@example.com', 'Becoming', 'Michelle Obama', '2025-09-01 12:52:15'),
(12, 'Alexander Martin', 'alexander.martin@example.com', '1984', 'George Orwell', '2025-09-01 12:52:15'),
(13, 'Emma Jackson', 'emma.jackson@example.com', 'The Book Thief', 'Markus Zusak', '2025-09-01 12:52:15'),
(14, 'Michael Thompson', 'michael.thompson@example.com', 'The Subtle Art of Not Giving a F*ck', 'Mark Manson', '2025-09-01 12:52:15'),
(15, 'Sophia Garcia', 'sophia.garcia@example.com', 'Little Women', 'Louisa May Alcott', '2025-09-01 12:52:15'),
(16, 'Ethan Martinez', 'ethan.martinez@example.com', 'The Great Gatsby', 'F. Scott Fitzgerald', '2025-09-01 12:52:15'),
(17, 'Ava Hernandez', 'ava.hernandez@example.com', 'The Catcher in the Rye', 'J.D. Salinger', '2025-09-01 12:52:15'),
(18, 'Matthew Robinson', 'matthew.robinson@example.com', 'Thinking, Fast and Slow', 'Daniel Kahneman', '2025-09-01 12:52:15'),
(19, 'Amelia Rodriguez', 'amelia.rodriguez@example.com', 'Normal People', 'Sally Rooney', '2025-09-01 12:52:15'),
(20, 'William Wood', 'william.wood@example.com', 'The Hobbit', 'J.R.R. Tolkien', '2025-09-01 12:52:15'),
(21, 'Olivia Thomas', 'olivia.thomas@example.com', 'Circe', 'Madeline Miller', '2025-09-01 12:52:15'),
(22, 'Alexander Rodriguez', 'alexander.rodriguez@example.com', 'Brave New World', 'Aldous Huxley', '2025-09-01 12:52:15'),
(23, 'Mia Thompson', 'mia.thompson@example.com', 'The Vanishing Half', 'Brit Bennett', '2025-09-01 12:52:15'),
(24, 'Elijah Jackson', 'elijah.jackson@example.com', 'Project Hail Mary', 'Andy Weir', '2025-09-01 12:52:15'),
(25, 'Charlotte Wilson', 'charlotte.wilson@example.com', 'The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', '2025-09-01 12:52:15'),
(26, 'James Davis', 'james.davis@example.com', 'To Kill a Mockingbird', 'Harper Lee', '2025-09-01 12:52:15'),
(27, 'Michael Thompson', 'michael.thompson@example.com', 'Project Hail Mary', 'Andy Weir ', '2025-09-01 13:01:29');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `delivery_detail`
--
ALTER TABLE `delivery_detail`
  ADD CONSTRAINT `fk_dd_user` FOREIGN KEY (`u_email`) REFERENCES `members` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_delivery` FOREIGN KEY (`delivery_id`) REFERENCES `delivery_detail` (`delivery_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_email`) REFERENCES `members` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
