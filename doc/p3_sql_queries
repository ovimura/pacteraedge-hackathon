-- Query 1. Rank 10 stores has lowest overall average weekly sales. If there is a tie between two
-- average weekly sales, they should have the same rank.

select st, avg_ws, rank() over( order by avg_ws asc) as RANK from 
(select st, avg_ws from 
(select Store st, avg(Weekly_Sales) avg_ws from sales_data
group by Store)
order by 2 ASC limit 10);



-- Query 2: For each type of the stores, find 5 stores with highest average weekly sales.

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



-- Query 3: Find stores with increased total sales in December from 2010 to 2011.

SELECT a.Store, a.date, a.total_ws, b.total_ws, b.date from
(select Store, substr(Date, 4,7) as date, sum(Weekly_Sales) as total_ws, substr(Date, 7,4) as year from sales_data
where (substr(Date, 7,4) = '2011' and substr(Date, 4,2) == '12')
group by 1) a join
(select Store, substr(Date, 4,7) as date, sum(Weekly_Sales) as total_ws, substr(Date, 7,4) as year from sales_data
where (substr(Date, 7,4) = '2010' and substr(Date, 4,2) == '12')
group by 1) b on a.Store = b.Store
where a.total_ws > b.total_ws;



-- 4. Analyze how sales is influenced by holiday
-- a. Average weekly sales on holiday weeks and non-holiday weeks
-- b. Top 20 weeks with highest weekly sales and calculate portion of holiday weeks and nonholiday weeks.

-- QUERY 4.a

select Date, IsHoliday, avg(Weekly_Sales) as avg_weekly_sales from sales_data
group by 2, 1
order by 2 DESC;

-- QUERY 4.b

create table h_highest_ws as
select Date, avg(Weekly_Sales) as avg_weekly_sales, IsHoliday from sales_data
where IsHoliday = 'TRUE'
group by 1
order by 2 DESC limit 10;

create table h_non_highest_ws as
select Date, avg(Weekly_Sales) as avg_weekly_sales, IsHoliday from sales_data
where IsHoliday = 'FALSE'
group by 1
order by 2 DESC limit 10;

SELECT * FROM h_highest_ws
UNION
SELECT * FROM  h_non_highest_ws
order by 3 DESC;

























