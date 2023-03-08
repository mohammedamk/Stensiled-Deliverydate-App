-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 17, 2020 at 07:47 PM
-- Server version: 5.7.29-0ubuntu0.16.04.1
-- PHP Version: 7.3.16-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `delivery_date_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `delivery_detail`
--

CREATE TABLE `delivery_detail` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `show_on_cart` int(11) NOT NULL DEFAULT '0',
  `show_on_thankyou` varchar(10) NOT NULL,
  `script_tag_id` bigint(20) DEFAULT NULL,
  `date_format` varchar(10) NOT NULL,
  `disable_date` text NOT NULL,
  `min_date` int(11) NOT NULL DEFAULT '4',
  `max_date` int(11) NOT NULL DEFAULT '7',
  `text_setting` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `delivery_detail`
--

INSERT INTO `delivery_detail` (`id`, `store_id`, `show_on_cart`, `show_on_thankyou`, `script_tag_id`, `date_format`, `disable_date`, `min_date`, `max_date`, `text_setting`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'on', 112061743150, 'd/m/Y', '13/04/2020', 4, 7, 'a:3:{s:16:"calender_heading";s:20:"Pick a Delivery Date";s:15:"cal_inline_text";s:20:"Select delivery date";s:21:"cart_required_message";s:43:"Please select delivery date before checkout";}', '2020-03-20 09:28:25', '2020-03-20 09:28:25');

-- --------------------------------------------------------

--
-- Table structure for table `review_setting_tbl`
--

CREATE TABLE `review_setting_tbl` (
  `id` varchar(20) NOT NULL,
  `auto_publish` int(11) NOT NULL DEFAULT '1',
  `receive_email_for_review` int(11) NOT NULL DEFAULT '1',
  `receive_email_addr` varchar(255) NOT NULL,
  `review_headline` varchar(255) NOT NULL DEFAULT 'Customer Reviews',
  `show_form_on_load` int(11) DEFAULT NULL,
  `review_form_title` varchar(255) NOT NULL DEFAULT 'CUSTOMER REVIEW',
  `review_link` varchar(900) NOT NULL DEFAULT 'Write a review',
  `summary_with_no_review` varchar(255) NOT NULL DEFAULT 'No reviews yet',
  `report_as_inappropriate` varchar(255) NOT NULL DEFAULT 'Report as Inappropriate',
  `report_as_inappropriate_mgs` varchar(255) NOT NULL DEFAULT 'Reported as Inappropriate message',
  `author_email` varchar(255) NOT NULL,
  `author_email_help_msg` varchar(255) NOT NULL,
  `author_email_type` varchar(255) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `author_name_help_msg` varchar(255) NOT NULL,
  `author_name_type` varchar(255) NOT NULL,
  `review_rating` varchar(255) NOT NULL,
  `review_title` varchar(255) NOT NULL,
  `review_title_help_msg` varchar(255) NOT NULL,
  `review_body` varchar(255) NOT NULL,
  `review_body_help_msg` varchar(255) NOT NULL,
  `submit_button` varchar(255) NOT NULL,
  `success_msg` varchar(255) NOT NULL,
  `err_msg` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `review_tbl`
--

CREATE TABLE `review_tbl` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `state` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `title` varchar(700) NOT NULL,
  `body_of_review` text NOT NULL,
  `reply` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `replied_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tokenTable`
--

CREATE TABLE `tokenTable` (
  `id` int(11) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `shop` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tokenTable`
--

INSERT INTO `tokenTable` (`id`, `access_token`, `shop`, `created_at`) VALUES
(1, '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', 'msubtest.myshopify.com', '2020-04-14 10:43:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `delivery_detail`
--
ALTER TABLE `delivery_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review_setting_tbl`
--
ALTER TABLE `review_setting_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review_tbl`
--
ALTER TABLE `review_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokenTable`
--
ALTER TABLE `tokenTable`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `delivery_detail`
--
ALTER TABLE `delivery_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `review_tbl`
--
ALTER TABLE `review_tbl`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tokenTable`
--
ALTER TABLE `tokenTable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
