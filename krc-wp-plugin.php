<?php

/**
 * Plugin Name: KRC IBM Cloud Storage
 * Description: Display images from IBM Cloud Object Storage bucket for Kingdom Running Club - Mobile Responsive
 * Version: 2.0
 * Author: KRC Development Team
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class KRC_IBM_Storage
{

    private $bucket_name = 'krc';
    private $endpoint = 's3.us-south.cloud-object-storage.appdomain.cloud';
    private $region = 'us-south';

    public function __construct()
    {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('krc_gallery', array($this, 'display_gallery_shortcode'));
        add_shortcode('krc_image', array($this, 'display_image_shortcode'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }

    public function init()
    {
        // Plugin initialization
    }

    public function enqueue_scripts()
    {
        wp_enqueue_style('krc-gallery-style', plugin_dir_url(__FILE__) . 'krc-gallery.css');
    }

    /**
     * Generate IBM Cloud Object Storage URL
     */
    private function get_storage_url($folder_path, $filename)
    {
        $base_url = "https://{$this->bucket_name}.{$this->endpoint}";
        // Properly encode the filename to handle spaces and special characters
        $encoded_filename = rawurlencode($filename);
        return $base_url . '/' . trim($folder_path, '/') . '/' . $encoded_filename;
    }

    /**
     * Shortcode to display a single image
     * Usage: [krc_image folder="events/miles-4-missions/2017" file="image.jpg" alt="Description"]
     */
    public function display_image_shortcode($atts)
    {
        $atts = shortcode_atts(array(
            'folder' => 'general',
            'file' => '',
            'alt' => 'KRC Image',
            'class' => 'krc-image',
            'width' => '',
            'height' => ''
        ), $atts);

        if (empty($atts['file'])) {
            return '<p>Error: No image file specified.</p>';
        }

        $image_url = $this->get_storage_url($atts['folder'], $atts['file']);

        $style = '';
        if (!empty($atts['width'])) {
            $style .= 'width: ' . $atts['width'] . ';';
        }
        if (!empty($atts['height'])) {
            $style .= 'height: ' . $atts['height'] . ';';
        }

        return sprintf(
            '<img src="%s" alt="%s" class="%s krc-responsive-image" style="%s" loading="lazy">',
            esc_url($image_url),
            esc_attr($atts['alt']),
            esc_attr($atts['class']),
            esc_attr($style)
        );
    }

    /**
     * Shortcode to display image gallery
     * Usage: [krc_gallery folder="events/miles-4-missions/2017" columns="3"]
     * Usage: [krc_gallery folder="events/miles-4-missions/2017" columns="3" pagination="true" per_page="12"]
     */
    public function display_gallery_shortcode($atts)
    {
        $atts = shortcode_atts(array(
            'folder' => 'general',
            'columns' => '3',
            'mobile_columns' => '1', // New: columns for mobile
            'tablet_columns' => '2', // New: columns for tablet
            'images' => '', // Comma-separated list of image files (optional)
            'class' => 'krc-gallery',
            'limit' => '200', // Maximum number of images to display
            'extensions' => 'jpg,jpeg,png,gif,webp,mp4,mov,avi,mkv', // Allowed file extensions
            'pagination' => 'true', // Enable pagination
            'per_page' => '20', // Images per page
            'show_count' => 'false', // Show image count
            'show_captions' => 'false', // Show image captions
            'disable_download' => 'true' // Disable right-click and download protection
        ), $atts);

        $columns = max(1, intval($atts['columns']));
        $mobile_columns = max(1, intval($atts['mobile_columns']));
        $tablet_columns = max(1, intval($atts['tablet_columns']));
        $limit = intval($atts['limit']);
        $per_page = intval($atts['per_page']);
        $allowed_extensions = array_map('trim', explode(',', strtolower($atts['extensions'])));

        // Get current page from URL parameter
        $current_page = isset($_GET['krc_page']) ? max(1, intval($_GET['krc_page'])) : 1;

        // If specific images are provided, use them
        if (!empty($atts['images'])) {
            $all_images = array_map('trim', explode(',', $atts['images']));
        } else {
            // Auto-fetch all images from the folder
            $all_images = $this->get_images_from_folder($atts['folder'], $allowed_extensions, $limit);

            if (empty($all_images)) {
                return '<div class="krc-error krc-mobile-friendly" style="padding: 15px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 8px; margin: 15px 0; font-size: 14px;">
                    <h4 style="margin-top: 0; font-size: 16px;">No images found in folder: ' . esc_html($atts['folder']) . '</h4>
                    <p><strong>Possible issues:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>The folder path might be incorrect</li>
                        <li>The bucket might not be publicly accessible</li>
                        <li>No image files exist in this folder</li>
                    </ul>
                    <p><strong>Try:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Check your IBM Cloud Object Storage bucket permissions</li>
                        <li>Verify the folder path: <code style="background: #fff; padding: 2px 4px; border-radius: 3px;">' . esc_html($atts['folder']) . '</code></li>
                        <li>Or specify images manually: <code style="background: #fff; padding: 2px 4px; border-radius: 3px; word-break: break-all;">[krc_gallery folder="' . esc_attr($atts['folder']) . '" images="filename1.jpg, filename2.jpg"]</code></li>
                    </ul>
                </div>';
            }
        }

        $total_images = count($all_images);
        $total_pages = ceil($total_images / $per_page);

        // Calculate images for current page
        $start_index = ($current_page - 1) * $per_page;
        $current_images = array_slice($all_images, $start_index, $per_page);

        // Generate unique gallery ID
        $gallery_id = 'krc-gallery-' . md5($atts['folder'] . time());

        $output = '<div id="' . $gallery_id . '" class="krc-gallery-container krc-mobile-container">';

        // Show image count
        if ($atts['show_count'] === 'true') {
            $output .= '<div class="krc-gallery-info krc-mobile-info" style="margin-bottom: 15px; text-align: center; color: #666; font-size: 13px; padding: 0 10px;">';
            $output .= sprintf(
                'Showing %d-%d of %d images from %s',
                $start_index + 1,
                min($start_index + $per_page, $total_images),
                $total_images,
                '<strong>' . esc_html($atts['folder']) . '</strong>'
            );
            $output .= '</div>';
        }

        // Responsive image gallery with CSS Grid
        $output .= '<div class="' . esc_attr($atts['class']) . ' krc-responsive-gallery" 
                    data-columns="' . $columns . '" 
                    data-mobile-columns="' . $mobile_columns . '" 
                    data-tablet-columns="' . $tablet_columns . '" 
                    style="display: grid; 
                           grid-template-columns: repeat(' . $mobile_columns . ', 1fr); 
                           gap: 10px; 
                           margin: 15px 0; 
                           padding: 0 10px;">';

        foreach ($current_images as $index => $image) {
            if (!empty($image)) {
                $image_url = $this->get_storage_url($atts['folder'], $image);
                $image_name = pathinfo($image, PATHINFO_FILENAME);
                $extension = strtolower(pathinfo($image, PATHINFO_EXTENSION));

                // Check if it's a video file
                $video_extensions = array('mp4', 'mov', 'avi', 'mkv', 'webm');
                $is_video = in_array($extension, $video_extensions);

                if ($is_video) {
                    // Video element with mobile optimizations
                    $video_attributes = '';
                    if ($atts['disable_download'] === 'true') {
                        $video_attributes = 'controlslist="nodownload" oncontextmenu="return false;" ondragstart="return false;" onselectstart="return false;"';
                    }

                    $output .= sprintf(
                        '<div class="krc-gallery-item krc-protected krc-mobile-item" data-index="%d" data-src="%s" data-caption="%s" data-type="video">
                            <video controls %s class="krc-responsive-video" style="width: 100%%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" preload="metadata" playsinline>
                                <source src="%s" type="video/%s">
                                Your browser does not support the video tag.
                            </video>
                            %s
                        </div>',
                        $index,
                        esc_url($image_url),
                        esc_attr($image_name),
                        $video_attributes,
                        esc_url($image_url),
                        esc_attr($extension === 'mov' ? 'quicktime' : $extension),
                        $atts['show_captions'] === 'true' ? '<div class="krc-image-caption krc-mobile-caption" style="text-align: center; margin-top: 8px; font-size: 11px; color: #666;">' . esc_html($image_name) . '</div>' : ''
                    );
                } else {
                    // Image element with mobile optimizations
                    $image_attributes = '';
                    if ($atts['disable_download'] === 'true') {
                        $image_attributes = 'oncontextmenu="return false;" ondragstart="return false;" onselectstart="return false;" onmousedown="return false;"';
                    }

                    $output .= sprintf(
                        '<div class="krc-gallery-item krc-protected krc-mobile-item" data-index="%d" data-src="%s" data-caption="%s" data-type="image">
                            <img src="%s" alt="%s" %s class="krc-responsive-image" style="width: 100%%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); user-select: none; cursor: pointer;" loading="lazy" onclick="openKrcCarousel(%d)" title="Tap to view full size">
                            %s
                        </div>',
                        $index,
                        esc_url($image_url),
                        esc_attr($image_name),
                        esc_url($image_url),
                        esc_attr($image_name),
                        $image_attributes,
                        $index,
                        $atts['show_captions'] === 'true' ? '<div class="krc-image-caption krc-mobile-caption" style="text-align: center; margin-top: 8px; font-size: 11px; color: #666;">' . esc_html($image_name) . '</div>' : ''
                    );
                }
            }
        }

        $output .= '</div>';

        // Mobile-responsive pagination controls
        if ($atts['pagination'] === 'true' && $total_pages > 1) {
            $output .= $this->generate_mobile_pagination($current_page, $total_pages, $gallery_id);
        }

        $output .= '</div>';

        // Add mobile-optimized modal for full-size images with carousel
        $output .= $this->get_mobile_image_carousel();

        // Add JavaScript data for carousel
        $output .= '<script type="text/javascript">
            window.krcGalleryData = window.krcGalleryData || {};
            window.krcGalleryData["' . $gallery_id . '"] = ' . json_encode(array(
            'images' => array_map(function ($img) use ($atts) {
                $extension = strtolower(pathinfo($img, PATHINFO_EXTENSION));
                $video_extensions = array('mp4', 'mov', 'avi', 'mkv', 'webm');
                return array(
                    'src' => $this->get_storage_url($atts['folder'], $img),
                    'caption' => pathinfo($img, PATHINFO_FILENAME),
                    'type' => in_array($extension, $video_extensions) ? 'video' : 'image',
                    'extension' => $extension
                );
            }, $current_images)
        )) . ';
        </script>';

        return $output;
    }

    /**
     * Generate mobile-responsive pagination HTML
     */
    private function generate_mobile_pagination($current_page, $total_pages, $gallery_id)
    {
        $output = '<div class="krc-pagination krc-mobile-pagination" style="text-align: center; margin: 20px 10px; padding: 15px 0;">';

        $base_url = remove_query_arg('krc_page');

        // Mobile-first pagination with larger touch targets
        $button_style = 'display: inline-block; padding: 12px 16px; margin: 0 4px 8px 4px; background: #0073aa; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; min-width: 44px; min-height: 44px; box-sizing: border-box; text-align: center; line-height: 20px; touch-action: manipulation;';
        $current_style = 'display: inline-block; padding: 12px 16px; margin: 0 4px 8px 4px; background: #005a87; color: white; border-radius: 6px; font-size: 14px; font-weight: bold; min-width: 44px; min-height: 44px; box-sizing: border-box; text-align: center; line-height: 20px;';
        $inactive_style = 'display: inline-block; padding: 12px 16px; margin: 0 4px 8px 4px; background: #f1f1f1; color: #333; text-decoration: none; border-radius: 6px; font-size: 14px; min-width: 44px; min-height: 44px; box-sizing: border-box; text-align: center; line-height: 20px; touch-action: manipulation;';

        // Previous button
        if ($current_page > 1) {
            $prev_url = add_query_arg('krc_page', $current_page - 1, $base_url);
            $output .= '<a href="' . esc_url($prev_url) . '#' . $gallery_id . '" class="krc-page-btn krc-prev krc-mobile-btn" style="' . $button_style . '">&laquo;</a>';
        }

        // Smart pagination for mobile (show fewer page numbers)
        $mobile_range = 2; // Show 2 pages on each side on mobile
        $start_page = max(1, $current_page - $mobile_range);
        $end_page = min($total_pages, $current_page + $mobile_range);

        // First page if not in range
        if ($start_page > 1) {
            $page_url = add_query_arg('krc_page', 1, $base_url);
            $output .= '<a href="' . esc_url($page_url) . '#' . $gallery_id . '" class="krc-page-btn krc-mobile-btn" style="' . $inactive_style . '">1</a>';
            if ($start_page > 2) {
                $output .= '<span style="margin: 0 5px; color: #666; display: inline-block; padding: 12px 4px;">...</span>';
            }
        }

        // Page numbers
        for ($i = $start_page; $i <= $end_page; $i++) {
            if ($i == $current_page) {
                $output .= '<span class="krc-page-current krc-mobile-current" style="' . $current_style . '">' . $i . '</span>';
            } else {
                $page_url = add_query_arg('krc_page', $i, $base_url);
                $output .= '<a href="' . esc_url($page_url) . '#' . $gallery_id . '" class="krc-page-btn krc-mobile-btn" style="' . $inactive_style . '">' . $i . '</a>';
            }
        }

        // Last page if not in range
        if ($end_page < $total_pages) {
            if ($end_page < $total_pages - 1) {
                $output .= '<span style="margin: 0 5px; color: #666; display: inline-block; padding: 12px 4px;">...</span>';
            }
            $page_url = add_query_arg('krc_page', $total_pages, $base_url);
            $output .= '<a href="' . esc_url($page_url) . '#' . $gallery_id . '" class="krc-page-btn krc-mobile-btn" style="' . $inactive_style . '">' . $total_pages . '</a>';
        }

        // Next button
        if ($current_page < $total_pages) {
            $next_url = add_query_arg('krc_page', $current_page + 1, $base_url);
            $output .= '<a href="' . esc_url($next_url) . '#' . $gallery_id . '" class="krc-page-btn krc-next krc-mobile-btn" style="' . $button_style . '">&raquo;</a>';
        }

        $output .= '</div>';

        // Mobile page info
        $output .= '<div class="krc-page-info krc-mobile-page-info" style="text-align: center; margin: 10px; color: #666; font-size: 12px;">';
        $output .= sprintf('Page %d of %d', $current_page, $total_pages);
        $output .= '</div>';

        return $output;
    }

    /**
     * Get mobile-optimized image carousel HTML
     */
    private function get_mobile_image_carousel()
    {
        return '
        <div id="krcImageCarousel" class="krc-mobile-carousel" style="display: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.95); touch-action: pan-x pan-y; overscroll-behavior: none;" onclick="handleCarouselBackdropClick(event)">
            <div class="krc-carousel-content" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 95%; height: 90%; text-align: center; display: flex; flex-direction: column; justify-content: center;" onclick="handleCarouselContentClick(event)">
                <div class="krc-media-container" style="flex: 1; display: flex; align-items: center; justify-content: center; min-height: 0;">
                    <img id="krcCarouselImage" class="krc-carousel-image" style="max-width: 100%; max-height: 100%; width: auto; height: auto; border-radius: 8px; display: none; user-select: none; touch-action: pan-x pan-y; object-fit: contain;" oncontextmenu="return false;" ondragstart="return false;" onselectstart="return false;">
                    <video id="krcCarouselVideo" class="krc-carousel-video" controls controlslist="nodownload" style="max-width: 100%; max-height: 100%; width: auto; height: auto; border-radius: 8px; display: none;" oncontextmenu="return false;" playsinline>
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="krc-caption-container" style="flex-shrink: 0; padding: 10px 0;">
                    <div id="krcCarouselCaption" class="krc-carousel-caption" style="color: white; margin-bottom: 5px; font-size: 14px; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); user-select: none; padding: 0 10px;"></div>
                    <div id="krcCarouselCounter" class="krc-carousel-counter" style="color: white; font-size: 12px; opacity: 0.8; user-select: none;"></div>
                </div>
            </div>
            
            <!-- Mobile-optimized Navigation Arrows - Positioned better for mobile -->
            <div id="krcCarouselPrev" class="krc-carousel-nav krc-carousel-prev" style="position: absolute; top: 45%; left: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.6); border: none; color: white; font-size: 28px; padding: 15px 12px; cursor: pointer; border-radius: 50%; backdrop-filter: blur(10px); transition: all 0.3s ease; min-width: 56px; min-height: 56px; display: flex; align-items: center; justify-content: center; touch-action: manipulation; z-index: 10001;" onclick="navigateCarousel(-1)">
                &#8249;
            </div>
            <div id="krcCarouselNext" class="krc-carousel-nav krc-carousel-next" style="position: absolute; top: 45%; right: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.6); border: none; color: white; font-size: 28px; padding: 15px 12px; cursor: pointer; border-radius: 50%; backdrop-filter: blur(10px); transition: all 0.3s ease; min-width: 56px; min-height: 56px; display: flex; align-items: center; justify-content: center; touch-action: manipulation; z-index: 10001;" onclick="navigateCarousel(1)">
                &#8250;
            </div>
            
            <!-- Mobile-optimized Close Button -->
            <div class="krc-carousel-close" style="position: absolute; top: 15px; right: 15px; color: white; font-size: 30px; cursor: pointer; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); padding: 10px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center; touch-action: manipulation;" onclick="closeKrcCarousel()">&times;</div>
            
            <!-- Mobile swipe indicator -->
            <div class="krc-swipe-indicator" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.6); font-size: 11px; text-align: center; opacity: 0.7;">
                Swipe left or right to navigate
            </div>
        </div>';
    }

    /**
     * Get all images from a folder in IBM Cloud Object Storage
     * This method fetches the actual file list from the bucket
     */
    private function get_images_from_folder($folder, $allowed_extensions = array('jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi', 'mkv'), $limit = 200)
    {
        // Try to get the actual file list from IBM Cloud Object Storage
        $images = $this->fetch_bucket_contents($folder, $allowed_extensions, $limit);

        if (!empty($images)) {
            return $images;
        }

        // Fallback: If API call fails, return empty and show helpful message
        return array();
    }

    /**
     * Fetch actual contents from IBM Cloud Object Storage bucket
     */
    private function fetch_bucket_contents($folder, $allowed_extensions, $limit)
    {
        $bucket_url = "https://{$this->bucket_name}.{$this->endpoint}";
        $list_url = $bucket_url . "?list-type=2&prefix=" . urlencode($folder . '/') . "&max-keys=" . $limit;

        // Get the XML listing from the bucket
        $response = wp_remote_get($list_url, array(
            'timeout' => 30,
            'headers' => array(
                'Accept' => 'application/xml'
            )
        ));

        if (is_wp_error($response)) {
            return array();
        }

        $body = wp_remote_retrieve_body($response);
        $status_code = wp_remote_retrieve_response_code($response);

        if ($status_code !== 200) {
            return array();
        }

        // Parse the XML response
        $images = $this->parse_bucket_xml($body, $folder, $allowed_extensions);

        return $images;
    }

    /**
     * Parse XML response from bucket listing
     */
    private function parse_bucket_xml($xml_content, $folder, $allowed_extensions)
    {
        $images = array();

        // Parse XML using SimpleXML
        libxml_use_internal_errors(true);
        $xml = simplexml_load_string($xml_content);

        if ($xml === false) {
            return array();
        }

        // Check if the XML has the expected structure
        if (!isset($xml->Contents)) {
            return array();
        }

        foreach ($xml->Contents as $content) {
            $key = (string)$content->Key;

            // Remove the folder prefix to get just the filename
            $filename = str_replace($folder . '/', '', $key);

            // Skip if it's just the folder itself or a subfolder
            if (empty($filename) || strpos($filename, '/') !== false) {
                continue;
            }

            // Check if it's an image file
            $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
            if (in_array($extension, $allowed_extensions)) {
                $images[] = $filename;
            }
        }

        return $images;
    }

    /**
     * Check if an image URL exists (simplified check)
     */
    private function image_exists($url)
    {
        // Simple approach - you can enhance this later
        // For now, we'll assume images exist based on patterns
        return true;
    }

    /**
     * Add admin menu for plugin settings
     */
    public function add_admin_menu()
    {
        add_options_page(
            'KRC IBM Storage Settings',
            'KRC Storage',
            'manage_options',
            'krc-storage',
            array($this, 'admin_page')
        );
    }

    /**
     * Admin page content
     */
    public function admin_page()
    {
?>
        <div class="wrap">
            <h1>KRC IBM Cloud Storage Settings</h1>

            <div class="card" style="max-width: 800px;">
                <h2>How to Use - Now Mobile Responsive!</h2>

                <h3>📱 Mobile Responsiveness Features</h3>
                <ul>
                    <li><strong>Adaptive Grid Layout:</strong> Automatically adjusts columns based on screen size</li>
                    <li><strong>Touch-Friendly Controls:</strong> Larger buttons and touch targets for mobile devices</li>
                    <li><strong>Swipe Navigation:</strong> Swipe left/right in carousel on touch devices</li>
                    <li><strong>Optimized Loading:</strong> Enhanced lazy loading for mobile performance</li>
                    <li><strong>Responsive Typography:</strong> Text sizes adapt to screen size</li>
                </ul>

                <h3>📸 Display Single Image</h3>
                <p>Use this shortcode to display a single image:</p>
                <code>[krc_image folder="events/miles-4-missions/2017" file="2017 Pictures for Website_1.jpg" alt="Miles 4 Missions 2017"]</code>

                <h3>🖼️ Display Mobile-Responsive Gallery</h3>
                <p><strong>Basic responsive gallery:</strong></p>
                <code>[krc_gallery folder="events/miles-4-missions/2017" columns="3" mobile_columns="1" tablet_columns="2"]</code>

                <p><strong>Advanced responsive gallery with mobile optimization:</strong></p>
                <code>[krc_gallery folder="events/miles-4-missions/2017" columns="4" mobile_columns="1" tablet_columns="2" extensions="jpg,png,mp4,mov"]</code>

                <p><strong>Full-featured responsive gallery:</strong></p>
                <code>[krc_gallery folder="events/miles-4-missions/2017" columns="3" mobile_columns="1" tablet_columns="2" show_count="true" show_captions="true"]</code>

                <h3>📁 Available Folders</h3>
                <ul>
                    <li><strong>events/miles-4-missions/2017/</strong> - Your uploaded 2017 pictures</li>
                    <li><strong>events/miles-4-missions/2018/</strong> - For 2018 pictures</li>
                    <li><strong>events/sneaker-ball/</strong> - Sneaker Ball event photos</li>
                    <li><strong>testimonials/photos/</strong> - Testimonial images</li>
                    <li><strong>about/team-photos/</strong> - Team photos</li>
                    <li><strong>resources/fitness-guides/</strong> - Fitness guide images</li>
                    <li><strong>general/backgrounds/</strong> - Background images</li>
                </ul>

                <h3>⚙️ Parameters (Including New Mobile Options)</h3>
                <ul>
                    <li><strong>folder</strong> - Path to folder in your IBM bucket (without leading/trailing slashes)</li>
                    <li><strong>columns</strong> - Number of columns in gallery on desktop (default: 3)</li>
                    <li><strong>mobile_columns</strong> - Number of columns on mobile devices (default: 1)</li>
                    <li><strong>tablet_columns</strong> - Number of columns on tablet devices (default: 2)</li>
                    <li><strong>per_page</strong> - Images per page for pagination (default: 20)</li>
                    <li><strong>limit</strong> - Maximum total images to scan (default: 200)</li>
                    <li><strong>pagination</strong> - Enable/disable pagination (default: true)</li>
                    <li><strong>show_count</strong> - Show image count info (default: false)</li>
                    <li><strong>show_captions</strong> - Show image captions (default: false)</li>
                    <li><strong>images</strong> - (Optional) Comma-separated list of specific filenames</li>
                    <li><strong>file</strong> - Exact filename including extension (for single image)</li>
                    <li><strong>alt</strong> - Alt text for accessibility</li>
                    <li><strong>width/height</strong> - Custom dimensions (e.g., width="300px")</li>
                    <li><strong>disable_download</strong> - Disable right-click and download protection (default: true)</li>
                </ul>

                <h3>📱 Responsive Breakpoints</h3>
                <ul>
                    <li><strong>Mobile:</strong> Up to 768px width</li>
                    <li><strong>Tablet:</strong> 769px to 1024px width</li>
                    <li><strong>Desktop:</strong> 1025px and above</li>
                </ul>

                <h3>🔗 Current Configuration</h3>
                <ul>
                    <li><strong>Bucket:</strong> <?php echo $this->bucket_name; ?></li>
                    <li><strong>Endpoint:</strong> <?php echo $this->endpoint; ?></li>
                    <li><strong>Region:</strong> <?php echo $this->region; ?></li>
                    <li><strong>Version:</strong> 2.0 (Mobile Responsive)</li>
                </ul>
            </div>
        </div>

        <style>
            .card {
                background: white;
                border: 1px solid #ccd0d4;
                border-radius: 4px;
                padding: 20px;
                margin: 20px 0;
            }

            code {
                background: #f1f1f1;
                padding: 10px;
                display: block;
                margin: 10px 0;
                border-radius: 4px;
                font-family: monospace;
                word-wrap: break-word;
                overflow-x: auto;
            }
        </style>
    <?php
    }
}

// Initialize the plugin
new KRC_IBM_Storage();

// Enhanced Mobile-Responsive CSS for frontend
add_action('wp_head', function () {
    ?>
    <style>
        /* Base Mobile-First Styles */
        .krc-gallery-container {
            margin: 15px 0;
            width: 100%;
            box-sizing: border-box;
        }

        .krc-responsive-gallery {
            margin: 15px 0;
            padding: 0 10px;
            box-sizing: border-box;
        }

        .krc-gallery-item {
            position: relative;
            transition: transform 0.3s ease;
            box-sizing: border-box;
        }

        .krc-responsive-image,
        .krc-responsive-video {
            width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: transform 0.3s ease;
            box-sizing: border-box;
        }

        .krc-gallery-item:hover .krc-responsive-image {
            transform: scale(1.02);
        }

        .krc-image {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* Mobile Pagination Styles */
        .krc-mobile-pagination {
            text-align: center;
            margin: 20px 10px;
            padding: 15px 0;
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
        }

        .krc-mobile-btn {
            display: inline-block;
            padding: 12px 16px;
            margin: 0 4px 8px 4px;
            background: #0073aa;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 14px;
            min-width: 44px;
            min-height: 44px;
            box-sizing: border-box;
            text-align: center;
            line-height: 20px;
            touch-action: manipulation;
            transition: background-color 0.3s ease;
        }

        .krc-mobile-btn:hover,
        .krc-mobile-btn:focus {
            background: #005a87;
            color: white;
            text-decoration: none;
        }

        .krc-mobile-current {
            background: #005a87;
            color: white;
            font-weight: bold;
        }

        /* Mobile Carousel Optimizations */
        .krc-mobile-carousel {
            touch-action: pan-x pan-y;
            overscroll-behavior: none;
        }

        .krc-carousel-content {
            padding: 20px;
            box-sizing: border-box;
        }

        .krc-carousel-image,
        .krc-carousel-video {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
            border-radius: 8px;
            touch-action: pan-x pan-y;
        }

        .krc-media-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 0;
            overflow: hidden;
        }

        .krc-caption-container {
            flex-shrink: 0;
            padding: 10px 0;
        }

        .krc-carousel-nav {
            min-width: 56px;
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            touch-action: manipulation;
            font-weight: bold;
            background: rgba(0,0,0,0.6) !important;
            z-index: 10001;
        }

        .krc-carousel-nav:hover {
            background: rgba(0,0,0,0.8) !important;
            transform: translateY(-50%) scale(1.05);
        }

        .krc-carousel-close {
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            touch-action: manipulation;
        }

        /* Download Protection Styles */
        .krc-protected {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .krc-protected img,
        .krc-protected video {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            pointer-events: auto;
        }

        /* Mobile Caption Styles */
        .krc-mobile-caption {
            font-size: 11px;
            line-height: 1.4;
            padding: 0 5px;
        }

        /* Error Message Mobile Styles */
        .krc-mobile-friendly {
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
            font-size: 14px;
            word-wrap: break-word;
        }

        /* Mobile Specific Carousel Improvements */
        @media (max-width: 768px) {
            .krc-carousel-content {
                width: 98% !important;
                height: 95% !important;
                padding: 0;
            }

            .krc-media-container {
                min-height: calc(100% - 80px);
                padding: 10px;
            }

            .krc-carousel-image,
            .krc-carousel-video {
                max-height: calc(100vh - 120px);
                max-width: calc(100vw - 40px);
            }

            .krc-carousel-nav {
                top: 40% !important;
                min-width: 50px;
                min-height: 50px;
                font-size: 24px;
                background: rgba(0,0,0,0.7) !important;
            }

            .krc-carousel-prev {
                left: 5px !important;
            }

            .krc-carousel-next {
                right: 5px !important;
            }

            .krc-carousel-caption {
                font-size: 13px;
                line-height: 1.3;
            }

            .krc-carousel-counter {
                font-size: 11px;
            }

            .krc-carousel-close {
                top: 10px !important;
                right: 10px !important;
                font-size: 32px;
                background: rgba(0,0,0,0.6);
                border-radius: 50%;
                width: 44px;
                height: 44px;
            }
        }

        /* Tablet Styles (769px - 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
            .krc-responsive-gallery {
                padding: 0 15px;
                gap: 15px;
            }

            .krc-responsive-gallery[data-tablet-columns="1"] {
                grid-template-columns: repeat(1, 1fr);
            }

            .krc-responsive-gallery[data-tablet-columns="2"] {
                grid-template-columns: repeat(2, 1fr);
            }

            .krc-responsive-gallery[data-tablet-columns="3"] {
                grid-template-columns: repeat(3, 1fr);
            }

            .krc-responsive-gallery[data-tablet-columns="4"] {
                grid-template-columns: repeat(4, 1fr);
            }

            .krc-mobile-pagination {
                padding: 20px 0;
            }

            .krc-mobile-caption {
                font-size: 12px;
            }

            .krc-carousel-nav {
                min-width: 55px;
                min-height: 55px;
                font-size: 26px;
                top: 45%;
            }
        }

        /* Desktop Styles (1025px and above) */
        @media (min-width: 1025px) {
            .krc-responsive-gallery {
                padding: 0 20px;
                gap: 20px;
            }

            .krc-responsive-gallery[data-columns="1"] {
                grid-template-columns: repeat(1, 1fr);
            }

            .krc-responsive-gallery[data-columns="2"] {
                grid-template-columns: repeat(2, 1fr);
            }

            .krc-responsive-gallery[data-columns="3"] {
                grid-template-columns: repeat(3, 1fr);
            }

            .krc-responsive-gallery[data-columns="4"] {
                grid-template-columns: repeat(4, 1fr);
            }

            .krc-responsive-gallery[data-columns="5"] {
                grid-template-columns: repeat(5, 1fr);
            }

            .krc-responsive-gallery[data-columns="6"] {
                grid-template-columns: repeat(6, 1fr);
            }

            .krc-gallery-item:hover .krc-responsive-image {
                transform: scale(1.05);
            }

            .krc-mobile-pagination {
                padding: 25px 0;
            }

            .krc-mobile-btn {
                padding: 10px 16px;
                margin: 0 3px;
                min-width: 40px;
                min-height: 40px;
            }

            .krc-mobile-caption {
                font-size: 13px;
            }

            .krc-carousel-nav {
                min-width: 60px;
                min-height: 60px;
                font-size: 30px;
            }

            .krc-swipe-indicator {
                display: none;
            }
        }

        /* Small Mobile Devices (up to 480px) */
        @media (max-width: 480px) {
            .krc-responsive-gallery {
                padding: 0 5px;
                gap: 8px;
            }

            .krc-gallery-container {
                margin: 10px 0;
            }

            .krc-mobile-pagination {
                margin: 15px 5px;
                padding: 10px 0;
            }

            .krc-mobile-btn {
                padding: 10px 12px;
                margin: 0 2px 6px 2px;
                font-size: 13px;
                min-width: 40px;
                min-height: 40px;
            }

            .krc-mobile-caption {
                font-size: 10px;
                margin-top: 6px;
            }

            .krc-carousel-content {
                width: 99% !important;
                height: 96% !important;
            }

            .krc-media-container {
                min-height: calc(100% - 70px);
                padding: 5px;
            }

            .krc-carousel-image,
            .krc-carousel-video {
                max-height: calc(100vh - 100px);
                max-width: calc(100vw - 20px);
            }

            .krc-carousel-nav {
                top: 35% !important;
                min-width: 44px;
                min-height: 44px;
                font-size: 20px;
                background: rgba(0,0,0,0.8) !important;
                border: 2px solid rgba(255,255,255,0.3);
            }

            .krc-carousel-prev {
                left: 3px !important;
            }

            .krc-carousel-next {
                right: 3px !important;
            }

            .krc-carousel-close {
                top: 5px !important;
                right: 5px !important;
                font-size: 30px;
                background: rgba(0,0,0,0.8);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                border: 2px solid rgba(255,255,255,0.3);
            }

            .krc-carousel-caption {
                font-size: 12px;
                padding: 0 10px;
                line-height: 1.2;
            }

            .krc-carousel-counter {
                font-size: 10px;
            }

            .krc-mobile-friendly {
                padding: 12px;
                margin: 10px 0;
                font-size: 13px;
            }
        }

        /* Landscape Mobile Orientation */
        @media (max-height: 500px) and (orientation: landscape) {
            .krc-carousel-content {
                height: 98% !important;
            }

            .krc-media-container {
                min-height: calc(100% - 50px);
            }

            .krc-carousel-image,
            .krc-carousel-video {
                max-height: calc(100vh - 60px);
                max-width: calc(100vw - 140px);
            }

            .krc-carousel-nav {
                top: 50% !important;
                min-width: 48px;
                min-height: 48px;
            }

            .krc-carousel-caption {
                font-size: 11px;
                margin-top: 3px;
                line-height: 1.2;
            }

            .krc-carousel-counter {
                font-size: 9px;
                margin-top: 2px;
            }

            .krc-caption-container {
                padding: 5px 0;
            }
        }

        /* High DPI / Retina Display Optimizations */
        @media (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi) {

            .krc-responsive-image,
            .krc-responsive-video {
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
            }
        }

        /* Reduced Motion Preferences */
        @media (prefers-reduced-motion: reduce) {

            .krc-gallery-item,
            .krc-responsive-image,
            .krc-responsive-video,
            .krc-mobile-btn {
                transition: none;
            }

            .krc-gallery-item:hover .krc-responsive-image {
                transform: none;
            }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
            .krc-mobile-friendly {
                background: #2d3748;
                color: #e2e8f0;
                border-color: #4a5568;
            }

            .krc-mobile-btn {
                background: #2b6cb0;
            }

            .krc-mobile-btn:hover,
            .krc-mobile-btn:focus {
                background: #2c5282;
            }

            .krc-mobile-current {
                background: #2c5282;
            }
        }
    </style>

    <script>
        let currentCarouselIndex = 0;
        let currentGalleryData = [];
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;

        // Handle backdrop click to close carousel
        function handleCarouselBackdropClick(event) {
            // Only close if clicking directly on the backdrop (not on content)
            if (event.target.id === 'krcImageCarousel') {
                closeKrcCarousel();
            }
        }

        // Handle content area clicks - prevent event bubbling to backdrop
        function handleCarouselContentClick(event) {
            // Stop the click from bubbling up to the backdrop
            event.stopPropagation();
            
            // Check if click is on the content container itself (not on image/video)
            if (event.target.classList.contains('krc-carousel-content') || 
                event.target.classList.contains('krc-media-container')) {
                closeKrcCarousel();
            }
        }

        function openKrcCarousel(index) {
            // Find the gallery container
            const galleryContainer = event.target.closest('.krc-gallery-container');
            const galleryId = galleryContainer.id;
            const galleryData = window.krcGalleryData[galleryId];

            if (!galleryData) return;

            currentGalleryData = galleryData.images;
            currentCarouselIndex = index;

            const carousel = document.getElementById('krcImageCarousel');
            carousel.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Add touch event listeners for mobile swipe
            carousel.addEventListener('touchstart', handleTouchStart, {
                passive: false
            });
            carousel.addEventListener('touchmove', handleTouchMove, {
                passive: false
            });
            carousel.addEventListener('touchend', handleTouchEnd, {
                passive: false
            });

            showCarouselItem(currentCarouselIndex);
        }

        function showCarouselItem(index) {
            if (!currentGalleryData.length) return;

            const item = currentGalleryData[index];
            const image = document.getElementById('krcCarouselImage');
            const video = document.getElementById('krcCarouselVideo');
            const caption = document.getElementById('krcCarouselCaption');
            const counter = document.getElementById('krcCarouselCounter');

            // Hide both elements first
            image.style.display = 'none';
            video.style.display = 'none';

            if (item.type === 'video') {
                video.src = item.src;
                video.style.display = 'block';
                video.load(); // Reload video for mobile compatibility
            } else {
                image.src = item.src;
                image.style.display = 'block';

                // Optimize image loading for mobile
                image.onload = function() {
                    // Image loaded successfully
                    this.style.opacity = '1';
                };
                image.style.opacity = '0.8';
            }

            caption.textContent = item.caption;
            counter.textContent = `${index + 1} of ${currentGalleryData.length}`;

            // Update navigation button visibility
            const prevBtn = document.getElementById('krcCarouselPrev');
            const nextBtn = document.getElementById('krcCarouselNext');

            if (prevBtn && nextBtn) {
                prevBtn.style.opacity = index > 0 ? '1' : '0.5';
                nextBtn.style.opacity = index < currentGalleryData.length - 1 ? '1' : '0.5';

                // Mobile accessibility
                prevBtn.setAttribute('aria-disabled', index <= 0);
                nextBtn.setAttribute('aria-disabled', index >= currentGalleryData.length - 1);
            }
        }

        function navigateCarousel(direction) {
            if (!currentGalleryData.length) return;

            const newIndex = currentCarouselIndex + direction;

            if (newIndex >= 0 && newIndex < currentGalleryData.length) {
                currentCarouselIndex = newIndex;
                showCarouselItem(currentCarouselIndex);
            }
        }

        function closeKrcCarousel() {
            const carousel = document.getElementById('krcImageCarousel');
            carousel.style.display = 'none';
            document.body.style.overflow = 'auto';

            // Remove touch event listeners
            carousel.removeEventListener('touchstart', handleTouchStart);
            carousel.removeEventListener('touchmove', handleTouchMove);
            carousel.removeEventListener('touchend', handleTouchEnd);

            // Pause video if playing
            const video = document.getElementById('krcCarouselVideo');
            if (video.src) {
                video.pause();
                video.src = '';
            }
        }

        // Touch event handlers for mobile swipe navigation
        function handleTouchStart(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }

        function handleTouchMove(e) {
            // Prevent default scrolling behavior
            if (Math.abs(e.touches[0].clientX - touchStartX) > Math.abs(e.touches[0].clientY - touchStartY)) {
                e.preventDefault();
            }
        }

        function handleTouchEnd(e) {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 50;

            // Only process horizontal swipes
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe right - go to previous image
                    navigateCarousel(-1);
                } else {
                    // Swipe left - go to next image
                    navigateCarousel(1);
                }
            }
        }

        // Keyboard navigation with mobile considerations
        document.addEventListener('keydown', function(e) {
            const carousel = document.getElementById('krcImageCarousel');
            if (carousel && carousel.style.display === 'block') {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        navigateCarousel(-1);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        navigateCarousel(1);
                        break;
                    case 'Escape':
                        e.preventDefault();
                        closeKrcCarousel();
                        break;
                }
            }
        });

        // Close carousel when clicking outside content (backdrop click)
        document.addEventListener('click', function(e) {
            const carousel = document.getElementById('krcImageCarousel');
            if (carousel && carousel.style.display === 'block') {
                // Check if click is on the carousel background or carousel content container
                if (e.target === carousel || e.target.classList.contains('krc-carousel-content')) {
                    closeKrcCarousel();
                }
            }
        });

        // Enhanced download protection with mobile considerations
        document.addEventListener('DOMContentLoaded', function() {
            // Disable right-click context menu on protected elements
            document.addEventListener('contextmenu', function(e) {
                if (e.target.closest('.krc-protected')) {
                    e.preventDefault();
                    return false;
                }
            });

            // Disable drag and drop
            document.addEventListener('dragstart', function(e) {
                if (e.target.closest('.krc-protected')) {
                    e.preventDefault();
                    return false;
                }
            });

            // Disable text selection
            document.addEventListener('selectstart', function(e) {
                if (e.target.closest('.krc-protected')) {
                    e.preventDefault();
                    return false;
                }
            });

            // Disable certain keyboard shortcuts
            document.addEventListener('keydown', function(e) {
                if (e.target.closest('.krc-protected') || e.target.closest('#krcImageCarousel')) {
                    // Disable Ctrl+S (Save), Ctrl+A (Select All), Ctrl+P (Print), F12 (DevTools)
                    if ((e.ctrlKey && (e.key === 's' || e.key === 'a' || e.key === 'p')) || e.key === 'F12') {
                        e.preventDefault();
                        return false;
                    }
                }
            });

            // Disable print screen (limited effectiveness)
            document.addEventListener('keyup', function(e) {
                if (e.key === 'PrintScreen') {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText('');
                    }
                }
            });

            // Mobile-specific optimizations
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                // Add mobile-specific classes
                document.body.classList.add('krc-mobile-device');

                // Prevent zoom on double tap for gallery items
                let lastTouchEnd = 0;
                document.addEventListener('touchend', function(e) {
                    const now = (new Date()).getTime();
                    if (now - lastTouchEnd <= 300) {
                        if (e.target.closest('.krc-gallery-item')) {
                            e.preventDefault();
                        }
                    }
                    lastTouchEnd = now;
                }, false);

                // Optimize video playback for mobile
                const videos = document.querySelectorAll('.krc-responsive-video');
                videos.forEach(function(video) {
                    video.setAttribute('playsinline', '');
                    video.setAttribute('webkit-playsinline', '');
                });
            }

            // Responsive grid adjustment
            function adjustResponsiveGrid() {
                const galleries = document.querySelectorAll('.krc-responsive-gallery');
                galleries.forEach(function(gallery) {
                    const screenWidth = window.innerWidth;
                    let columns;

                    if (screenWidth <= 768) {
                        columns = gallery.dataset.mobileColumns || 1;
                    } else if (screenWidth <= 1024) {
                        columns = gallery.dataset.tabletColumns || 2;
                    } else {
                        columns = gallery.dataset.columns || 3;
                    }

                    gallery.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
                });
            }

            // Adjust grid on load and resize
            adjustResponsiveGrid();
            window.addEventListener('resize', adjustResponsiveGrid);

            // Optimize for viewport changes (mobile orientation)
            window.addEventListener('orientationchange', function() {
                setTimeout(adjustResponsiveGrid, 100);
            });
        });
    </script>
<?php
});
?>