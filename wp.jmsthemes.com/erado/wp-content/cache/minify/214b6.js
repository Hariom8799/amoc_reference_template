(function($){"use strict";$.fn.FL_ImagesLoaded=function(callback){var FL_Images=function(src,callback){var img=new Image();img.onload=callback;img.src=src;};var images=this.find('img').toArray().map(function(el){return el.src;});var loaded=0;$(images).each(function(i,src){FL_Images(src,function(){loaded++;if(loaded==images.length){callback();}});});}
function PreLoader(){var el=$('.preloader');if(!el.length){return;}
$(window).load(function(){el.fadeOut('slow');});}
function QuantityAdjust(){$('body').on('click','.quantity .plus',function(e){var $input=$(this).parent().parent().find('input.input-text'),$quantity=parseInt($input.attr('max')),$step=parseInt($input.attr('step')),$val=parseInt($input.val()),$button=$('.single_add_to_cart_button');if(($quantity!=='')&&($quantity<=$val+$step)){$('.quantity .plus').css('pointer-events','none');}
$input.val($val+$step);$input.trigger('change');$button.attr('data-quantity',$val+$step);});$('body').on('click','.quantity .minus',function(e){var $input=$(this).parent().parent().find('input.input-text'),$step=parseInt($input.attr('step')),$val=parseInt($input.val())-$step,$button=$('.single_add_to_cart_button');if($val<$step)$val=$step;$input.val($val);$('.quantity .plus').removeAttr('style');$input.trigger('change');$button.attr('data-quantity',$val);});}
function BackToTop(){$(window).scroll(function(){if($(this).scrollTop()>=500){$('#backtop').fadeIn();}else{$('#backtop').fadeOut();}});$('#backtop').on('click',function(){$('html, body').animate({scrollTop:0},800);return false;});}
function MasonryLayout(){var el=$('.erado-masonry');el.each(function(i,val){var _option=$(this).data('masonry');if(_option!==undefined){var _selector=_option.selector,_width=_option.columnWidth,_layout=_option.layoutMode;$(this).FL_ImagesLoaded(function(){$(val).isotope({percentPosition:true,itemSelector:_selector,masonry:{columnWidth:_width}});});$('.jms-filter a').on('click',function(){var selector=$(this).data('filter'),parent=$(this).parents('.jms-filter');$(val).isotope({filter:selector});if($(this).hasClass('selected')){return false;}
parent.find('.selected').removeClass('selected');$(this).addClass('selected');return false;});}});}
function PushMenu(){$('a.push-menu-btn').on('click',function(e){e.preventDefault();var mask='<div class="mask-overlay">';$('body').toggleClass('has-vertical-menu');$(mask).hide().appendTo('#header-wrapper').fadeIn('fast');$('.mask-overlay, .close-menu').on('click',function(){$('body').removeClass('has-vertical-menu');$('.mask-overlay').remove();});});}
function toggleSidebar(){$('a.toggle-sidebar').on('click',function(e){e.preventDefault();var mask='<div class="mask-overlay">';$('body').toggleClass('has-toggle-sidebar');$(mask).hide().appendTo('body').fadeIn('fast');$('.mask-overlay').on('click',function(){$('body').removeClass('has-toggle-sidebar');$('.mask-overlay').remove();});});}
function StickyHeader(){var lastScroll=0;var heightHeader=$('#header-wrapper').height();$(window).scroll(function(){var st=$(this).scrollTop();var scroll=$(window).scrollTop();if(($(window).width()>991)&&(st>lastScroll)){$('#header-wrapper .main-header').addClass('fixed-top').css('top','-100px');$('#header-wrapper').css('height',heightHeader);}
else{$('#header-wrapper .main-header').addClass('fixed-top').css('top','0');}
lastScroll=st;if((st<=heightHeader)&&$('#header-wrapper .main-header').hasClass('fixed-top')){$('#header-wrapper .main-header').removeClass('fixed-top');$('#header-wrapper').css('height','auto');}});}
function AjaxLoadMoreItem(){var button=$('.fl-ajax-load-more');button.each(function(i,val){var _option=$(this).data('load-more');if(_option!==undefined){var page=_option.page,container=_option.container,layout=_option.layout,isLoading=false,anchor=$(val).find('a'),next=$(anchor).attr('href'),i=2;if(layout=='load-more'){$(val).on('click','a',function(e){e.preventDefault();anchor=$(val).find('a');next=$(anchor).attr('href');$(anchor).html('<i class="fa fa-circle-o-notch fa-spin"></i>');getData();});}else{var animationFrame=function(){anchor=$(val).find('a');next=$(anchor).attr('href');var bottomOffset=$('.'+container).offset().top+$('.'+container).height()-$(window).scrollTop();if(bottomOffset<window.innerHeight&&bottomOffset>0&&!isLoading){if(!next)
return;isLoading=true;$(anchor).html('<i class="fa fa-circle-o-notch fa-spin"></i>');getData();}};var scrollHandler=function(){requestAnimationFrame(animationFrame);};$(window).scroll(scrollHandler);}
var getData=function(){$.get(next+'',function(data){var content=$('.'+container,data).wrapInner('').html(),newElement=$('.'+container,data).find('.item');$(content).FL_ImagesLoaded(function(){next=$(anchor,data).attr('href');$('.'+container).append(newElement).isotope('appended',newElement);});$(anchor).text(FL_Data_Js.load_more);if(page>i){if(FL_Data_Js!==undefined&&FL_Data_Js.permalink=='plain'){var link=next.replace(/paged=+[0-9]+/gi,'paged='+(i+1));}else{var link=next.replace(/page\/+[0-9]+\//gi,'page/'+(i+1)+'/');}
$(anchor).attr('href',link);}else{$(anchor).text(FL_Data_Js.no_more_item);$(anchor).removeAttr('href').addClass('disabled');}
isLoading=false;i++;});}}});}
function Item_Animation(){if(typeof ScrollReveal!='undefined'){window.sr=ScrollReveal().reveal('.item-animation',{duration:700},200);}}
function ProductQuickView(){$('body').on('click','.btn-quickview',function(e){var _this=$(this);$('.site').after('<div class="loader"><div class="loader-inner"></div></div>');var id=_this.attr('data-product'),data={action:'erado_quickview',product:id};$.post(JmsAjaxURL,data,function(response){if(typeof $.fn.magnificPopup!='undefined'){$.magnificPopup.open({items:{src:response},mainClass:'mfp-zoom-in',removalDelay:500,});}
setTimeout(function(){if($('.product-quickview form').hasClass('variations_form')){$('.product-quickview form.variations_form').wc_variation_form();$('.product-quickview select').trigger('change');}},100);$('.loader').remove();SlickSlider();$('.images').imagesLoaded(function(){var imgHeight=$('.product-quickview .images').outerHeight();if($(window).width()>767){$('.product-quickview .wc-product-top > div').css({'height':imgHeight});}});});e.preventDefault();e.stopPropagation();});}
var SlickSlider=function(){$('.thumbnail-slider').not('.slick-initialized').slick();};function StickySidebar(){var content=$('#main-content'),sidebar=$('#main-sidebar');var contentHeight=$('#main-content').outerHeight();var sidebarHeight=$('#main-sidebar').outerHeight();if(sidebarHeight<contentHeight){if($('body.admin-bar.has-sticky-header').length>0){sidebar.theiaStickySidebar({additionalMarginTop:150});}else if($('body.has-sticky-header').length>0){sidebar.theiaStickySidebar({additionalMarginTop:120});}else if($('body.admin-bar').length>0){sidebar.theiaStickySidebar({additionalMarginTop:50});}else{sidebar.theiaStickySidebar({additionalMarginTop:30});}}
var summary3=$('.wc-single-product-style-3 .column-right');if($('body.admin-bar.has-sticky-header').length>0){summary3.theiaStickySidebar({additionalMarginTop:150});}else if($('body.has-sticky-header').length>0){summary3.theiaStickySidebar({additionalMarginTop:120});}else if($('body.admin-bar').length>0){summary3.theiaStickySidebar({additionalMarginTop:50});}else{summary3.theiaStickySidebar({additionalMarginTop:30});}
var summary4=$('.wc-single-product-style-4 .column-right');if($('body.admin-bar.has-sticky-header').length>0){summary4.theiaStickySidebar({additionalMarginTop:150});}else if($('body.has-sticky-header').length>0){summary4.theiaStickySidebar({additionalMarginTop:120});}else if($('body.admin-bar').length>0){summary4.theiaStickySidebar({additionalMarginTop:50});}else{summary4.theiaStickySidebar({additionalMarginTop:30});}
var summary6_left=$('.wc-single-product-style-6 .column-left');var summary6_right=$('.wc-single-product-style-6 .column-right');if($('body.admin-bar.has-sticky-header').length>0){summary6_left.theiaStickySidebar({additionalMarginTop:150});summary6_right.theiaStickySidebar({additionalMarginTop:150});}else if($('body.has-sticky-header').length>0){summary6_left.theiaStickySidebar({additionalMarginTop:120});summary6_right.theiaStickySidebar({additionalMarginTop:120});}else if($('body.admin-bar').length>0){summary6_left.theiaStickySidebar({additionalMarginTop:50});summary6_right.theiaStickySidebar({additionalMarginTop:50});}else{summary6_left.theiaStickySidebar({additionalMarginTop:50});summary6_right.theiaStickySidebar({additionalMarginTop:50});}}
function CarouselSlider(){var el=$('.owl-carousel');el.each(function(i,val){var _option=$(this).data('carousel');if(_option!==undefined){var _selector=_option.selector,_itemDesktop=_option.itemDesktop,_itemMedium=_option.itemMedium,_itemTablet=_option.itemTablet,_itemMobile=_option.itemMobile,_margin=_option.margin,_nav=_option.nav;var rtl=false;if($('body').hasClass('rtl'))rtl=true;$(_selector).owlCarousel({responsive:{320:{items:_itemMobile,margin:30},480:{items:_itemTablet,margin:30},991:{items:_itemMedium,},1199:{items:_itemDesktop,}},rtl:rtl,margin:_margin,dots:false,nav:true,autoplay:false,loop:false,smartSpeed:1000,navText:['<i class="icon-arrow prev"></i>','<i class="icon-arrow next"></i>']});}});}
function PopupProductImage(){$('.p-thumb').each(function(){$(this).magnificPopup({delegate:'.p-item a',type:'image',mainClass:'mfp-no-margins mfp-with-zoom',gallery:{enabled:true},zoom:{enabled:true,duration:300}});});}
function PopupVideo(){if($('.wc-single-video').length>0){$('.wc-popup-url').magnificPopup({type:'iframe'});}};function Parse_Url_To_Array(url){if(url.search('&')==-1)
return false;var data={},queries,temp,i;queries=url.split("&");for(i=0;i<queries.length;i++){temp=queries[i].split('=');data[temp[0]]=temp[1];}
return data;}
function AddToWishlist(){$('body').on('click','.yith-wcwl-add-button .add_to_wishlist',function(e){e.preventDefault();$(this).css('opacity','0');});$(document).ajaxComplete(function(event,xhr,settings){var url=settings.url;var data_request=(typeof settings.data!='undefined')?settings.data:'';if(settings.data!==undefined){var data_array_url=Parse_Url_To_Array(settings.data);if(data_array_url.action=='add_to_wishlist'){$('body > .wc-notice-cart-outer').remove();var content_notice='<div class="wc-notice-cart-outer"><div class="wc-notice-cart"><div class="icon-notice"><i class="fa fa-heart-o"></i></div><div class="text-notice"><div> '+xhr.responseJSON.message+' </div><a class="db" href="'+xhr.responseJSON.wishlist_url+'">'+FL_Data_Js.viewall_wishlist+'</a></div></div></div>';$('body').append(content_notice);var close=$('<span class="close-notice pe-7s-close"></span>').on('click',function(){$(this).closest('.wc-notice-cart-outer').removeClass('active');});$('body .wc-notice-cart').prepend(close);setTimeout(function(){$('body > .wc-notice-cart-outer').addClass('active');},'10');setTimeout(function(){$('body > .wc-notice-cart-outer').removeClass('active');},'5000');}}});$('body').on('click','.yith-wcwl-remove-button a',function(e){e.preventDefault();var _this=$(this);var parent=_this.closest('.yith-wcwl-add-to-wishlist');var loading=parent.find('.yith-wcwl-remove-button .ajax-loading');var add=parent.find('.yith-wcwl-add-button .add_to_wishlist');_this.css('opacity','0');loading.css('visibility','visible');add.css('opacity','1');var data_request={action:'erado_remove_product_wishlist',_nonce:_nonce_erado,product_id:_this.attr('data-product-id')};$.ajax({type:'POST',url:JmsAjaxURL,data:data_request,success:function(val){if(val.status=='true'){loading.css('visibility','hidden');parent.find('.yith-wcwl-remove-button').removeClass('show').hide();parent.find('.yith-wcwl-add-button').removeClass('hide').show();_this.css('opacity','1');}}});});}
function ChangeProductStyle(){var buttonGrid=$('.wc-switch .view-grid'),buttonList=$('.wc-switch .view-list'),productLayout=$('.product-layout');buttonGrid.on('click',function(e){e.preventDefault();$(this).addClass('active');buttonList.removeClass('active');productLayout.removeClass('erado-list');productLayout.addClass('erado-grid');});buttonList.on('click',function(e){e.preventDefault();$(this).addClass('active');buttonGrid.removeClass('active');productLayout.removeClass('erado-grid');productLayout.addClass('erado-list');});};function ShowMobileMenu(){$('.menu-toggle .menu-button, .fl-mobile-nav .close-menu').on('click',function(){if($('body').hasClass('menu-mob-open-menu')){$('body').removeClass('menu-mob-open-menu');}else{$('body').addClass('menu-mob-open-menu');}});}
function DropdownMenuMobile(){if($(window).width()<992){$('ul.mobile-menu li.menu-item-has-children').append('<span class="holder"></span>');$('body').on('click','.holder',function(){var el=$(this).closest('li');if(el.hasClass('open')){el.removeClass('open');el.find('li').removeClass('open');el.find('ul').slideUp();}else{el.addClass('open');el.children('ul').slideDown();el.siblings('li').children('ul').slideUp();el.siblings('li').removeClass('open');el.siblings('li').find('li').removeClass('open');el.siblings('li').find('ul').slideUp();}});}};function ShopFilterToggle(){$('.shop-filter-toggle.filter-off-canvas').on('click',function(e){var $this=$(this);$this.toggleClass('open');e.preventDefault();$('.shop-filter').toggleClass('open');});$('.close-filter').on('click',function(e){$('.shop-filter-toggle.filter-off-canvas').removeClass('open');e.preventDefault();$('.shop-filter').removeClass('open');});$('.shop-filter-btn a').on('click',function(e){var $this=$(this);$this.toggleClass('open');e.preventDefault();$('.shop-filter-top').slideToggle('100',function(){$('.shop-filter-top').toggleClass('open');});});$('.shop-filter-toggle.filter-top').on('click',function(e){var $this=$(this);$this.toggleClass('open');e.preventDefault();$('.shop-filter-top').slideToggle('100',function(){$('.shop-filter-top').toggleClass('open');});});}
function Countdown(){var $el=$('.erado-countdown');$el.each(function(i,val){var _option=$(this).data('time');if(_option!==undefined){var _day=_option.day,_month=_option.month,_year=_option.year,_end=_month+' '+_day+', '+_year+' 00:00:00';$(val).countdown({date:_end,render:function(data){$(this.$el).html("<div class='dib'><span class='db'>"+this.leadingZeros(data.days,2)+"</span><span class='db'>"+FL_Data_Js['days']+"</span></div><div class='dib'><span class='db'>"+this.leadingZeros(data.hours,2)+"</span><span class='db'>"+FL_Data_Js['hrs']+"</span></div><div class='dib'><span class='db'>"+this.leadingZeros(data.min,2)+"</span><span class='db'>"+FL_Data_Js['mins']+"</span></div><div class='dib'><span class='db'>"+this.leadingZeros(data.sec,2)+"</span><span class='db'>"+FL_Data_Js['secs']+"</span></div>");}});}});}
function refreshMiniCart(){$.ajax({type:'POST',url:JmsAjaxURL,dataType:'json',data:{action:'load_mini_cart'},success:function(response){if(response.message!=null&&$(response.message.error).length>0){$('body').append('<div class="woocommerce-error">'+response.message.error+'</div>');$('.woocommerce-message').remove();}else{var cart_list=$('.widget_shopping_cart_content');if(response.cart_html.length>0){cart_list.html(response.cart_html);}
$('.cart-contents .cart-count').text(response.cart_total);var cartSidebar=$('.cartSidebarWrap');if(cartSidebar.length){$('.cartContentsCount').text(response.cart_total);}}}});}
function addToCartSingleDefault(){if(!$('body').hasClass('btn-cart-default'))return;var _input=$('.quantity input'),_quantity=_input.attr('max');if(_quantity!=''){_input.bind('keyup mouseup change click',function(){if(parseInt($(this).val())>parseInt(_quantity)){$('.single_add_to_cart_button').addClass('disabled');}else{$('.single_add_to_cart_button').removeClass('disabled');}});}
$('body').on('click','.single_add_to_cart_button',function(e){e.preventDefault();e.stopPropagation();var _this=$(this),_form=_this.parents('form');if(_this.hasClass('disabled'))return;_this.addClass('loading');_this.removeClass('added');$.ajax({type:'POST',url:JmsSiteURL,dataType:'html',data:_form.serialize(),cache:false,headers:{'cache-control':'no-cache'},success:function(){refreshMiniCart();_this.removeClass('loading');_this.addClass('added');}});});}
function toggleCartSidebar(){if(!$('body').hasClass('btn-sidebar'))return;$('body').on('click','.toggle-sidebar > .cart-contents',function(e){e.preventDefault();var mask='<div class="mask-overlay">';$('body').toggleClass('has-toggle-cart-sidebar');$(mask).hide().appendTo('body').fadeIn('fast');$('.mask-overlay').on('click',function(){$('body').removeClass('has-toggle-cart-sidebar');$('.mask-overlay').remove();});});$('body').on('added_to_cart',function(e){refreshMiniCart();var mask='<div class="mask-overlay">';$('body').toggleClass('has-toggle-cart-sidebar');$(mask).hide().appendTo('body').fadeIn('fast');$('.mask-overlay').on('click',function(){$('body').removeClass('has-toggle-cart-sidebar');$('.mask-overlay').remove();});});$('.close_cart_sidebar').on('click',function(e){$('body').removeClass('has-toggle-cart-sidebar');e.preventDefault();$('.mask-overlay').remove();});}
function addToCartSingleSidebar(){if(!$('body').hasClass('btn-sidebar'))return;var _input=$('.quantity input'),_quantity=_input.attr('max');if(_quantity!=''){_input.bind('keyup mouseup change click',function(){if(parseInt($(this).val())>parseInt(_quantity)){$('.single_add_to_cart_button').addClass('disabled');}else{$('.single_add_to_cart_button').removeClass('disabled');}});}
$('body').on('click','.single_add_to_cart_button',function(e){e.preventDefault();e.stopPropagation();var _this=$(this),_form=_this.parents('form');if(_this.hasClass('disabled'))return;_this.addClass('loading');_this.removeClass('added');$.ajax({type:'POST',url:JmsSiteURL,dataType:'html',data:_form.serialize(),cache:false,headers:{'cache-control':'no-cache'},success:function(){refreshMiniCart();_this.removeClass('loading');_this.addClass('added');var mask='<div class="mask-overlay">';$('body').toggleClass('has-toggle-cart-sidebar');$(mask).hide().appendTo('body').fadeIn('fast');$('.mask-overlay').on('click',function(){$('body').removeClass('has-toggle-cart-sidebar');$('.mask-overlay').remove();});}});});}
function add_to_cart_ajax(_this){var form_cart=_this.closest('form');var data_post=form_cart.serialize();var productID=_this.attr('data-product_id');if(data_post.search('add-to-cart=')!=-1){_this.addClass('loading');_this.removeClass('added');$.ajax({type:'POST',url:JmsAjaxURL,data:{action:'add_to_cart_message',product_id:productID},success:function(val){if(val.message==undefined)
return false;_this.removeClass('loading');_this.addClass('added');$('body > .wc-notice-cart-outer').remove();var content_notice='<div class="wc-notice-cart-outer"><div class="wc-notice-cart"><div class="icon-notice"><i class="shopbag"></i></div><div class="text-notice">'+val.message+'</div></div></div>';$('body').append(content_notice);var close=$('<span class="close-notice pe-7s-close"></span>').on('click',function(){$(this).closest('.wc-notice-cart-outer').removeClass('active');});$('body .wc-notice-cart').prepend(close);setTimeout(function(){$('body > .wc-notice-cart-outer').addClass('active');},'10');setTimeout(function(){$('body > .wc-notice-cart-outer').removeClass('active');},'5000');}});}}
function removeCartItem(){$('body').on('click','.mini_cart_item a.remove',function(e){e.preventDefault();var $this=$(this);var $productKey=$(this).data('item-key');$this.closest('li').addClass('loading');$.ajax({url:JmsAjaxURL,dataType:'json',type:'POST',cache:false,headers:{'cache-control':'no-cache'},data:{'action':'cart_remove_item','item_key':$productKey},success:function(response){refreshMiniCart();}});});}
function addToCartProductInfo(){var toggleCartSidebar=$('#header-cart.preview-popup');if(!toggleCartSidebar.length)return;$('body').append('<div class="modal_add_to_cart"><div class="erado-notice-wrapper"><div class="erado-notice"></div><div class="close"><i class="fa fa-times-circle"></i></div></div></div>');$('.modal_add_to_cart .close').on('click',function(){$('.modal_add_to_cart').fadeOut();$('.erado-notice').html('');});$('body').on('adding_to_cart',function(event,button,data){var ajaxPId=button.attr('data-product_id');var ajaxPQty=button.attr('data-quantity');jQuery.post(JmsAjaxURL,{'action':'get_productinfo','data':{'pid':ajaxPId,'quantity':ajaxPQty}},function(response){$('.erado-notice').html(response);});});$('body').on('added_to_cart',function(event,fragments,cart_hash){$('.modal_add_to_cart').fadeIn();});}
function landingscroll(){$('a.smooth-scroll').on("click",function(e){var anchor=$(this);$('html, body').stop().animate({scrollTop:$(anchor.attr('href')).offset().top-70},1000);e.preventDefault();});}
$(document).ready(function(){PreLoader();StickyHeader();toggleSidebar();PushMenu();BackToTop();MasonryLayout();StickySidebar();CarouselSlider();ShowMobileMenu();DropdownMenuMobile();Countdown();QuantityAdjust();ProductQuickView();AjaxLoadMoreItem();Item_Animation();SlickSlider();PopupProductImage();PopupVideo();AddToWishlist();ChangeProductStyle();ShopFilterToggle();addToCartSingleDefault();toggleCartSidebar();addToCartSingleSidebar();addToCartProductInfo();removeCartItem();landingscroll();if($('.product-box').hasClass('no-ajax')){$('.add_to_cart_button').removeClass('ajax_add_to_cart');}
$(document).find('iframe[src*="youtube.com"]').each(function(){var td_video=$(this);td_video.attr('width','100%');var td_video_width=td_video.width();td_video.css('height',td_video_width*0.5625,'important');});if(true==$.browser.mozilla){$('body').addClass('firefox');}
$(".product-type-external .single_add_to_cart_button").on('click',function(e){e.stopPropagation();});$("#header-cart .dropdown-menu .buttons").on('click',function(e){e.stopPropagation();});$('.style-1 .yith-wcwl-add-button a, .style-1 .yith-wcwl-remove-button a, .style-1 .compare-button a ').each(function(){var text=$.trim($(this).text());var title=$.trim($(this).attr('title'));$(this).attr('data-toggle','tooltip');$(this).attr('data-placement','top');if(!title){$(this).attr('title',text);}});$('[data-toggle="tooltip"]').tooltip({container:'body'});$('.box-action-thumb .yith-wcwl-add-button a, .box-action-thumb  .yith-wcwl-remove-button a,.box-action-thumb .compare-button a,.box-action-thumb .quick-view a').each(function(){var text=$.trim($(this).text());var title=$.trim($(this).attr('title'));$(this).attr('data-toggle','tooltip');$(this).attr('data-placement','left');if(!title){$(this).attr('title',text);}});$('[data-toggle="tooltip"]').tooltip({container:'body'});$('.box-action-thumb3 .yith-wcwl-add-button a, .box-action-thumb3 .yith-wcwl-remove-button a,.box-action-thumb3 .compare-button a').each(function(){var text=$.trim($(this).text());var title=$.trim($(this).attr('title'));$(this).attr('data-toggle','tooltip');$(this).attr('data-placement','top');if(!title){$(this).attr('title',text);}});$('[data-toggle="tooltip"]').tooltip({container:'body'});$('.box-action-thumb4 .compare-button a, .box-action-thumb4 .quick-view a').each(function(){var text=$.trim($(this).text());var title=$.trim($(this).attr('title'));$(this).attr('data-toggle','tooltip');$(this).attr('data-placement','top');if(!title){$(this).attr('title',text);}});$('[data-toggle="tooltip"]').tooltip({container:'body'});$('.style-4 .product-thumb .yith-wcwl-add-button a, .style-4 .product-thumb .yith-wcwl-remove-button a').each(function(){var text=$.trim($(this).text());var title=$.trim($(this).attr('title'));$(this).attr('data-toggle','tooltip');$(this).attr('data-placement','left');if(!title){$(this).attr('title',text);}});$('[data-toggle="tooltip"]').tooltip({container:'body'});$('.box-action-thumb5 .yith-wcwl-add-button a, .box-action-thumb5 .yith-wcwl-remove-button a,.box-action-thumb5 .compare-button a, .style-5 .quick-view a ').each(function(){var text=$.trim($(this).text());var title=$.trim($(this).attr('title'));$(this).attr('data-toggle','tooltip');$(this).attr('data-placement','left');if(!title){$(this).attr('title',text);}});$('[data-toggle="tooltip"]').tooltip({container:'body'});});})(jQuery);