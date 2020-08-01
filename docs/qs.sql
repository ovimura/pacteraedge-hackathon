select Store, avg(Weekly_Sales) avg_weekly_sale from sales_data
group by Store
order by 2;


select a.st, b.avg_ws from 
(select Store st, avg(Weekly_Sales) avg_ws from sales_data
group by Store) a join (select Store st, avg(Weekly_Sales) avg_ws from sales_data
group by Store) b on a.avg_ws = b.avg_ws;

create table mytemp as 
select st, avg_ws from 
(select Store st, avg(Weekly_Sales) avg_ws from sales_data
group by Store)
order by 2 ASC limit 10;

select * from mytemp;

select type, avg(store) from stores_data
group by TYPE;

select row_number() over( order by st) as rf, avg_ws from mytemp;
select st, rank() over( order by avg_ws asc) as RANK, avg_ws from mytemp;



-- Query 1

select st, avg_ws, rank() over( order by avg_ws asc) as RANK from 
(select st, avg_ws from 
(select Store st, avg(Weekly_Sales) avg_ws from sales_data
group by Store)
order by 2 ASC limit 10);



-- Query 2

create table high_avg_ws_A as 
select st.Type, st.store, avg(sa.Weekly_Sales) from stores_data st inner join sales_data sa on st.store = sa.store
where st.Type = 'A'
group by 1, 2
order by 3 desc limit 5;

create table high_avg_ws_B as 
select st.Type, st.store, avg(sa.Weekly_Sales) from stores_data st inner join sales_data sa on st.store = sa.store
where st.Type = 'B'
group by 1, 2
order by 3 desc limit 5;


create table high_avg_ws_C as 
select st.Type, st.store, avg(sa.Weekly_Sales) from stores_data st inner join sales_data sa on st.store = sa.store
where st.Type = 'C'
group by 1, 2
order by 3 desc limit 5;


select type, Store, "avg(sa.Weekly_Sales)" as avg_weely_sales from high_avg_ws_A
UNION
select * from high_avg_ws_B
UNION
select * from high_avg_ws_C;


-- Query 3

select Store, Date, Weekly_Sales, substr(Date, 7,4) year from sales_data
where (substr(Date, 7,4) = '2010' or substr(Date, 7,4) = '2011') and (substr(Date, 4,2) == '12')
group by 1, 2;










