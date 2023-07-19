FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./start.sh /etc/nginx/start.sh
RUN chmod +x /etc/nginx/start.sh

CMD ["/etc/nginx/start.sh"]